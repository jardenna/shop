import { useState } from 'react';
import { ChangeInputType } from '../types/types';

type UseTableEditFieldProps<T extends { id: string }> = {
  data: T[];
  callback?: (id: string, values: Partial<T>) => void;
};

const useTableEditField = <T extends { id: string }>({
  data,
  callback,
}: UseTableEditFieldProps<T>) => {
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [editingField, setEditingField] = useState<keyof T | null>(null);
  const [values, setValues] = useState<Partial<T>>({});

  const handleShowEditInput = (id: string, field: keyof T) => {
    setEditRowId(id);
    setEditingField(field);
    const row = data.find((item) => item.id === id);
    if (row) {
      setValues({ [field]: row[field] } as Partial<T>);
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
  };

  const handleSaveEdit = () => {
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
    handleShowEditInput,
    handleEditChange,
    handleCancelEdit,
    handleSaveEdit,
    editValues: values,
  };
};

export default useTableEditField;
