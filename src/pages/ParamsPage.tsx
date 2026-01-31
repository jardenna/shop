import PriceFilter from '../components/filter/PriceFilter';
import useSearchParamsState from '../hooks/useSearchParamsState';

const ParamsPage = () => {
  const initialFilters = {
    features: ['apple'],
    sizes: [],
    colors: [],
    brand: [],
    minPrice: '',
    maxPrice: '',
  };

  const { values, setValue, toggleValue } =
    useSearchParamsState(initialFilters);

  const checkboxItems = [
    { label: 'banana', value: 'banana' },
    { label: 'orange', value: 'orange' },
    { label: 'apple', value: 'apple' },
  ];

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(values);
      }}
    >
      {checkboxItems.map(({ label, value }) => (
        <div key={value}>
          <input
            id={value}
            type="checkbox"
            checked={values.features.includes(value)}
            onChange={() => {
              toggleValue('features', value);
            }}
          />
          <label htmlFor={value}>{label}</label>
        </div>
      ))}

      <PriceFilter
        key={`${values.minPrice}-${values.maxPrice}`}
        minPrice={values.minPrice}
        maxPrice={values.maxPrice}
        onMinChange={(value) => {
          setValue('minPrice', value);
        }}
        onMaxChange={(value) => {
          setValue('maxPrice', value);
        }}
        min={0}
        max={10000}
      />

      <button type="submit">Search</button>
    </form>
  );
};

export default ParamsPage;
