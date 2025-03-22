import { ChangeEvent, useState } from 'react';

type Item = { [key: string]: string | number | boolean }; // Define a general item type
type Values = { [key: string]: string }; // Define the type for values in the state

interface UseFilterProps {
  initialState: Values;
  items: Item[];
}

function useFilter({ initialState, items }: UseFilterProps) {
  const [values, setValues] = useState<Values>(initialState);

  const filteredText = items.filter((item) => {
    for (const key in values) {
      if (item[key]) {
        const a = typeof item[key] === 'string' && item[key].toLowerCase();
        const b = typeof values[key] === 'string' && values[key].toLowerCase();

        if (
          typeof a === 'string' &&
          typeof b === 'string' &&
          !a.includes(b) &&
          values[key] !== ''
        ) {
          return false;
        }
      }
    }
    return true;
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setValues({
      ...values,
      [name]: value,
    });
  };

  const handleEmptyInput = (name: string) => {
    setValues({
      ...values,
      [name]: '',
    });
  };

  return {
    handleChange,
    values,
    handleEmptyInput,
    filteredText,
  };
}

export default useFilter;
