import useFormValidation from '../../hooks/useFormValidation';

type Values = { [key: string]: string };

interface UseFilterProps<T> {
  initialState: Values;
  items: T[];
}

function useFilter<T extends { [key: string]: any }>({
  initialState,
  items,
}: UseFilterProps<T>) {
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
