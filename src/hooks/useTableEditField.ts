/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

type ChangeInputType = React.ChangeEvent<HTMLInputElement>;

type UseTableEditFieldProps<T extends { id: string }> = {
  data: T[];
  callback?: (id: string, values: Partial<T>) => void;
};

export const useTableEditField = <T extends { id: string }>({
  data,
  callback,
}: UseTableEditFieldProps<T>) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof T | null>(null);
  const [values, setValues] = useState<Partial<T>>({});

  const handleEdit = (id: string, field: keyof T) => {
    setEditRowId(id);
    setEditingField(field);
    const row = data.find((item) => item.id === id);
    if (row) {
      setValues({ [field]: row[field] } as Partial<T>);
    }
  };

  const handleChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    setValues((prev) => ({ ...prev, [name]: value }));
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };

  const handleSave = () => {
    if (callback && editRowId) {
      callback(editRowId, values);
    }
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };

  return {
    editRowId,
    editingField,
    handleEdit,
    handleChange,
    handleCancel,
    handleSave,
    editValues: values,
  };
};
