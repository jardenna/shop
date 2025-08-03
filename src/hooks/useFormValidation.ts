import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import type {
  BlurEventType,
  ChangeInputType,
  FormEventType,
} from '../types/types';
import { allowedExtensions, maxFiles, maxFileSize } from '../utils/utils';

export type KeyValuePair<T> = {
  [key: string]: T;
};

export type PreviewImg = { name: string; size: string; url: string };

export type ValidationErrors = {
  [key: string]: string;
};

export type FormValues = {
  [key: string]: string | number | string[];
};

type FormValidationProps<T extends KeyValuePair<unknown>> = {
  initialState: T;
  isArray?: boolean;
  isLoading?: boolean;
  callback?: (values: T) => void;
  validate?: (values: T) => ValidationErrors;
};

function useFormValidation<T extends KeyValuePair<unknown>>({
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
  const [previewData, setPreviewData] = useState<PreviewImg[]>([]);
  const [fileErrors, setFileErrors] = useState<KeyValuePair<string>>({});

  useEffect(() => {
    if (isSubmitting) {
      const noErrors = !Object.keys(errors).length;
      if (noErrors) {
        setTouched([]);
      }
      setIsSubmitting(false);
    }
  }, [errors]);

  const handleFileChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const selectedFiles = event.target.files;
      if (!selectedFiles) {
        return;
      }

      const formatBytes = (bytes: number) => `${Math.round(bytes / 1000)} KB`;

      const allFiles = Array.from(selectedFiles);

      // Validate files first
      const validationResults = allFiles.map((file) => {
        const ext = file.name
          .substring(file.name.lastIndexOf('.') + 1)
          .toLowerCase();
        const isValidExt = allowedExtensions.includes(ext);
        const isValidSize = file.size <= maxFileSize;

        let reason = '';
        if (!isValidExt) {
          reason = 'invalidFileType';
        } else if (!isValidSize) {
          reason = 'fileTooLarge';
        }

        return {
          file,
          isValid: isValidExt && isValidSize,
          reason,
        };
      });

      // Separate valid and rejected files
      const validFiles = validationResults
        .filter((f) => f.isValid)
        .slice(0, maxFiles)
        .map((f) => f.file);

      const rejectedFiles = [
        ...validationResults
          .filter((f) => !f.isValid)
          .map((f) => ({
            name: f.file.name,
            reason: f.reason,
          })),
      ];

      const overflow = validationResults
        .filter((f) => f.isValid)
        .slice(maxFiles);
      overflow.forEach((f) =>
        rejectedFiles.push({
          name: f.file.name,
          reason: `maximumFileLimitExceeded`,
        }),
      );

      setFilesData(validFiles);

      setPreviewData(
        validFiles.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          size: formatBytes(file.size),
        })),
      );

      const errorsForFiles = rejectedFiles.reduce<Record<string, string>>(
        (acc, cur) => ({ ...acc, [cur.name]: cur.reason }),
        {},
      );

      setFileErrors(errorsForFiles);
    },
    [],
  );

  function onChange(event: ChangeInputType) {
    const { name, value, type, checked } = event.target as HTMLInputElement;

    setValues({
      ...values,
      [name]: type === 'number' ? Number(value) : value,
    });

    if (type === 'checkbox') {
      setValues(() => {
        const currentValues = values[name] as string[];
        if (checked) {
          return {
            ...values,
            [name]: [...currentValues, value],
          };
        }
        return {
          ...values,
          [name]: currentValues.filter((item) => item !== value),
        };
      });
    }

    if (!touched.includes(name)) {
      setTouched([...touched, name]);
    }

    // Clear the error message when typing
    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete updatedErrors[name];
      return updatedErrors;
    });
  }

  const onCustomChange = (
    name: string,
    value: Date | string | number | (string | number)[],
  ) => {
    if (isArray) {
      setValues({
        ...values,
        [name]: [
          ...new Set([...(values[name] as (string | number | Date)[]), value]),
        ],
      });
    } else {
      setValues({
        ...values,
        [name]: value,
      });
    }

    setErrors((prevErrors) => {
      const updatedErrors = { ...prevErrors };
      // eslint-disable-next-line @typescript-eslint/no-dynamic-delete
      delete updatedErrors[name];
      return updatedErrors;
    });
  };

  const handleClearInput = (name: string) => {
    setValues({
      ...values,
      [name]: '',
    });
  };

  const onClearAllValues = () => {
    setValues(initialState);
  };

  const onFocus = () => {
    setIsFocused(true);
  };

  const onBlur = (event: BlurEventType) => {
    setIsFocused(false);
    const { name } = event.target;

    // Update touched state safely
    setTouched((prev) => (prev.includes(name) ? prev : [...prev, name]));

    // Validate only the blurred field
    if (validate) {
      const validationErrors = validate(values);
      setErrors((prevErrors) => ({
        ...prevErrors,
        [name]: validationErrors[name],
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

  const onSubmit = (event: FormEventType) => {
    event.preventDefault();
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

  const removePreviewImage = (name: string) => {
    setPreviewData((prevPreviewData) =>
      prevPreviewData.filter((img) => img.name !== name),
    );

    const updatedFilesData = filesData.filter((file) => file.name !== name);
    setFilesData(updatedFilesData);
  };

  return {
    onSubmit,
    onChange,
    onCustomChange,
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
    handleFileChange,
    fileErrors,
  };
}

export default useFormValidation;
