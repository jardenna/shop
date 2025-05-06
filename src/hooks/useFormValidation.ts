import { ChangeEvent, useCallback, useEffect, useState } from 'react';
import { BlurEventType, ChangeInputType, FormEventType } from '../types/types';

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

export type FormValidationProps<T extends KeyValuePair<unknown>> = {
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
      if (selectedFiles) {
        setFilesData(Array.from(selectedFiles));

        const fileArray = Array.from(selectedFiles);
        const formatBytes = (bytes: number) => `${Math.round(bytes / 1000)} KB`;

        const previews = fileArray.map((file) => ({
          url: URL.createObjectURL(file),
          name: file.name,
          size: formatBytes(file.size),
        }));

        setPreviewData(previews);
      }
    },
    [],
  );

  function onChange(event: ChangeInputType) {
    const { name, value, type, checked, files } =
      event.target as HTMLInputElement;

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

    const file = files?.[0];

    if (file) {
      if (event.target instanceof HTMLInputElement) {
        handleFileChange(event as ChangeEvent<HTMLInputElement>);
      }
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
    if (!touched.includes(name)) {
      setTouched([...touched, name]);
    }

    // Validate the specific field on blur
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
  };
}

export default useFormValidation;
