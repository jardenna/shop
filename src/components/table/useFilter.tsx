import useFormValidation from '../../hooks/useFormValidation';

type Item = { [key: string]: string | number }; // Define a general item type
type Values = { [key: string]: string }; // Define the type for values in the state

interface UseFilterProps {
  initialState: Values;
  items: Item[];
}

function useFilter({ initialState, items }: UseFilterProps) {
  const { onChange, values, onClearAllValues, onClearInput } =
    useFormValidation({
      initialState,
    });

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

  return {
    onChange,
    values,
    onClearInput,
    onClearAllFilters: onClearAllValues,
    filteredItems,
  };
}

export default useFilter;
