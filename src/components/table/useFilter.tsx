import { ChangeEvent, useState } from 'react';

type Item = { [key: string]: string | number }; // Define a general item type
type Values = { [key: string]: string }; // Define the type for values in the state

interface UseFilterProps {
  initialState: Values;
  items: Item[];
}

function useFilter({ initialState, items }: UseFilterProps) {
  const [values, setValues] = useState<Values>(initialState);

  const filteredItems = items.filter((item) =>
    Object.keys(values).every(
      (key) =>
        item[key] &&
        typeof item[key] === 'string' &&
        typeof values[key] === 'string' &&
        (item[key].toLowerCase().includes(values[key].toLowerCase()) ||
          values[key] === ''),
    ),
  );

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  // This is for clearing search. You can use this or just use a input type "search"
  const handleClearInput = (name: string) => {
    setValues({
      ...values,
      [name]: '',
    });
  };

  return {
    onChange: handleChange,
    values,
    onClearInput: handleClearInput,
    filteredItems,
  };
}

export default useFilter;
