import { useEffect, useState } from 'react';
import type {
  BlurEventType,
  ChangeInputType,
  ChangeTextAreaType,
} from '../types/types';
import { allowedExtensions, maxFileSize } from '../utils/utils';

export type KeyValuePair<T = unknown> = {
  [key: string]: T;
};

export type ValidationErrors<T extends Record<string, any>> = Partial<
  Record<keyof T, string>
>;

export type FormValues = {
  [key: string]: string | number | string[] | null;
};

type FormValidationProps<T extends KeyValuePair> = {
  initialState: T;
  isArray?: boolean;
  isLoading?: boolean;
  callback?: (values: T) => void;
  validate?: (values: T) => ValidationErrors<T>;
};

type ValidatedFile = {
  file: File;
  name: string;
  size: string;
  url: string;
  reason?: 'invalidFileType' | 'fileTooLarge';
};

export function useFormValidation<T extends KeyValuePair>({
  initialState,
  callback,
  validate,
  isArray,
  isLoading,
}: FormValidationProps<T>) {
  const [values, setValues] = useState<T>(initialState);
  const [errors, setErrors] = useState<KeyValuePair<string>>({});
  const [touched, setTouched] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [filesData, setFilesData] = useState<File[]>([]);
  const [previewData, setPreviewData] = useState<ValidatedFile[]>([]);

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = !Object.keys(errors).length;
      if (noErrors) {
        setTouched([]);
      }
      setIsSubmitting(false);
    }
  }, [errors]);

  function clearFieldError(name: string) {
    setErrors((previous) => {
      const updatedErrors = { ...previous };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  function onChange(event: ChangeInputType) {
    const { name, value, type, checked } = event.target;

    setValues((previous) => {
      let updatedValue: string | number | null | string[];

      if (type === 'checkbox') {
        const currentValues = previous[name] as string[];

        updatedValue = checked
          ? [...currentValues, value]
          : currentValues.filter((item) => item !== value);
      } else if (type === 'number') {
        updatedValue = value === '' ? null : Math.max(0, Number(value));
      } else {
        updatedValue = value;
      }

      return {
        ...previous,
        [name]: updatedValue,
      };
    });

    if (!touched.includes(name)) {
      setTouched((previous) => [...previous, name]);
    }

    clearFieldError(name);
  }

  // Special case for number step
  const handleNumberStepChange = (field: string, amount: number) => {
    setValues((previous) => ({
      ...previous,
      [field]: (previous[field] as number) + amount,
    }));
  };

  // Special case for singleCheckbox
  function handleChangeToggleSwitch(event: ChangeInputType) {
    const { name, checked } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: checked,
    }));
  }

  function handleChangeTextArea(event: ChangeTextAreaType) {
    const { name, value } = event.target;

    setValues((previous) => ({
      ...previous,
      [name]: value,
    }));
  }

  const handleFileChange = (event: ChangeInputType) => {
    const selectedFiles = event.target.files;
    if (!selectedFiles) {
      return;
    }

    const formatBytes = (bytes: number) => `${Math.round(bytes / 1000)} KB`;

    // accumulate instead of overwrite
    const newFiles = Array.from(selectedFiles);

    setFilesData((prev) => [...prev, ...newFiles]);

    const validatedResults: ValidatedFile[] = newFiles.map((file) => {
      const ext = file.name
        .substring(file.name.lastIndexOf('.') + 1)
        .toLowerCase();
      const isValidExt = allowedExtensions.includes(ext);
      const isValidSize = file.size <= maxFileSize;

      let reason: ValidatedFile['reason'];
      if (!isValidExt) {
        reason = 'invalidFileType';
      } else if (!isValidSize) {
        reason = 'fileTooLarge';
      }

      return {
        file,
        name: file.name,
        size: formatBytes(file.size),
        url: URL.createObjectURL(file),
        reason,
        // key property used for removing file by identity, not name
        lastModified: file.lastModified,
      };
    });

    setPreviewData((prev) => [...prev, ...validatedResults]);
  };

  const removePreviewImage = (lastModified: number) => {
    setFilesData((prev) =>
      prev.filter((file) => file.lastModified !== lastModified),
    );

    setPreviewData((prev) =>
      prev.filter((item) => item.file.lastModified !== lastModified),
    );
  };

  function handleCustomChange(
    name: string,
    value: Date | string | number | (string | number)[],
  ) {
    setValues((previous) => {
      if (isArray) {
        return {
          ...previous,
          [name]: [
            ...new Set([
              ...(previous[name] as (string | number | Date)[]),
              value,
            ]),
          ],
        };
      }

      return {
        ...previous,
        [name]: value,
      };
    });

    clearFieldError(name);
  }

  const handleClearInput = (name: string) => {
    setValues({
      ...values,
      [name]: '',
    });
  };

  const onClearAllValues = () => {
    setValues(initialState);
    setErrors({});
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (event: BlurEventType) => {
    setIsFocused(false);
    const { name } = event.target;
    if (!touched.includes(name)) {
      setTouched((prev) => [...prev, name]);
    }

    // Validate the specific field on blur
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name as keyof T] ?? '',
      }));
    }
  };

  const scrollToFirstError = (errors: KeyValuePair<string>) => {
    const firstErrorField = Object.keys(errors)[0];
    const errorElement = document.querySelector(`[name="${firstErrorField}"]`);
    if (errorElement) {
      errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      (errorElement as HTMLElement).focus();
    }
  };

  const isFormDirty = JSON.stringify(values) !== JSON.stringify(initialState);

  const onSubmit = () => {
    const validationErrors = validate ? validate(values) : {};
    const formHasNoErrors = !Object.keys(validationErrors).length;
    if (isLoading) {
      return;
    }
    if (formHasNoErrors) {
      setIsSubmitting(true);
      if (callback) {
        callback(values);
      }
    } else {
      setErrors(validationErrors);
      scrollToFirstError(validationErrors);
    }
  };

  return {
    onSubmit,
    onChange,
    onChangeTextArea: handleChangeTextArea,
    onCustomChange: handleCustomChange,
    onClearInput: handleClearInput,
    isFocused,
    onFocus,
    onBlur,
    values,
    errors,
    onClearAllValues,
    filesData,
    previewData,
    removePreviewImage,
    onFileChange: handleFileChange,
    isFormDirty,
    onNumberStepChange: handleNumberStepChange,
    onChangeToggleSwitch: handleChangeToggleSwitch,
  };
}
