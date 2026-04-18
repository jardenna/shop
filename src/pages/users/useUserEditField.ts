import { useState } from 'react';
import type { ChangeInputType } from '../../types/types';

type UseTableEditFieldProps<T extends { id: string }> = {
  data: T[];
  callback?: (id: string, values: Partial<T>) => void;
};

export const useUserEditField = <T extends { id: string }>({
  data,
  callback,
}: UseTableEditFieldProps<T>) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof T | null>(null);
  const [values, setValues] = useState<Partial<T>>({});
  const [initialValues, setInitialValues] = useState<Partial<T>>({});

  const handleShowEditInput = (id: string, field: keyof T) => {
    setEditRowId(id);
    setEditingField(field);
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
    setEditRowId(null);
    setEditingField(null);
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

    if (callback && editRowId) {
      callback(editRowId, values);
    }

    setEditRowId(null);
    setEditingField(null);
    setValues({});
    setInitialValues({});
  };

  return {
    editRowId,
    editingField,
    handleShowEditInput,
    handleEditChange,
    handleCancelEdit,
    handleSaveEdit,
    editValues: values,
    isFormDirty,
  };
};
