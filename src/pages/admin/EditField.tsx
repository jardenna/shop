import { useMemo } from 'react';

type EditFieldProps<T extends Record<string, any>> = {
  data: T[];
  id: string;
  showEditInput: boolean;
  td: keyof T;
};

const EditField = <T extends Record<string, any>>({
  data,
  id,
  td,
}: EditFieldProps<T>) => {
  const categoryValue = useMemo(
    () => String(data.find((item) => item.id === id)?.[td] || ''),
    [data, id, td],
  );
  return <section>{categoryValue}</section>;
};
export default EditField;
