import { useState } from 'react';
import type { ChangeInputType } from '../../types/types';

interface UseTableUpdateFieldProps<T extends { id: string }> {
  data: T[];
  callback?: (id: string, values: Partial<T>) => void;
}
console.log(1);

export const useUpdateUserField = <T extends { id: string }>({
  data,
  callback,
}: UseTableUpdateFieldProps<T>) => {
  const [updateRowId, setUpdateRowId] = useState<string | null>(null);
  const [updatesField, setUpdatesField] = useState<keyof T | null>(null);
  const [values, setValues] = useState<Partial<T>>({});
  const [initialValues, setInitialValues] = useState<Partial<T>>({});

  const handleShowUpdateInput = (id: string, field: keyof T) => {
    setUpdateRowId(id);
    setUpdatesField(field);
    const row = data.find((item) => item.id === id);
    if (row) {
      const initialFieldValue = { [field]: row[field] } as Partial<T>;

      setValues(initialFieldValue);
      setInitialValues(initialFieldValue);
    }
  };

  const handleUpdateChange = (event: ChangeInputType) => {
    const { name, value } = event.target;

    setValues({ ...values, [name]: value });
  };

  const isFormDirty = Object.keys(values).some((key) => {
    const typedKey = key as keyof T;
    return values[typedKey] !== initialValues[typedKey];
  });

  const handleSave = () => {
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
    onShowUpdateInput: handleShowUpdateInput,
    onUpdateChange: handleUpdateChange,
    onSave: handleSave,
    values,
    isFormDirty,
  };
};
