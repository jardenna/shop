import { useState } from 'react';
import type { ChangeInputType } from '../../types/types';

interface UseTableUpdateFieldProps<T extends { id: string }> {
  data: T[];
  callback?: (id: string, values: Partial<T>) => void;
}

export const useUpdateUserField = <T extends { id: string }>({
  data,
  callback,
}: UseTableUpdateFieldProps<T>) => {
  const [updateRowId, setUpdateRowId] = useState<string | null>(null);
  const [updatesField, setUpdatesField] = useState<keyof T | null>(null);
  const [values, setValues] = useState<Partial<T>>({});
  const [initialValues, setInitialValues] = useState<Partial<T>>({});

  const handleShowEditInput = (id: string, field: keyof T) => {
    setUpdateRowId(id);
    setUpdatesField(field);
    const row = data.find((item) => item.id === id);
    if (row) {
      const initialFieldValue = { [field]: row[field] } as Partial<T>;

      setValues(initialFieldValue);
      setInitialValues(initialFieldValue);
    }
  };

  const handleEditChange = (event: ChangeInputType) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const handleCancelEdit = () => {
    setUpdateRowId(null);
    setUpdatesField(null);
    setValues({});
    setInitialValues({});
  };

  const isFormDirty = Object.keys(values).some((key) => {
    const typedKey = key as keyof T;
    return values[typedKey] !== initialValues[typedKey];
  });

  const handleSaveEdit = () => {
    if (!isFormDirty) {
      return;
    }

    if (callback && updateRowId) {
      callback(updateRowId, values);
    }

    setUpdateRowId(null);
    setUpdatesField(null);
    setValues({});
    setInitialValues({});
  };

  return {
    updateRowId,
    updatesField,
    handleShowEditInput,
    handleEditChange,
    handleCancelEdit,
    handleSaveEdit,
    editValues: values,
    isFormDirty,
  };
};
