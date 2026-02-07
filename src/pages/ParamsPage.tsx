import PriceFilter from '../components/filter/PriceFilter';
import useSearchParamsState from '../hooks/useSearchParamsState';
import { availableBrands, availableSizes, colors } from '../utils/filters';

const ParamsPage = () => {
  const initialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const { values, setValue, toggleValue } =
    useSearchParamsState(initialFilters);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
        console.log(values);
      }}
    >
      <ul className="checkbox-list">
        {availableBrands.map((value) => (
          <li key={value} className="checkbox-item">
            <input
              id={value}
              type="checkbox"
              name="brand"
              value={value}
              checked={values.brand.includes(value)}
              onChange={toggleValue}
            />
            <label htmlFor={value}>{value}</label>
          </li>
        ))}
      </ul>

      <ul className="checkbox-list">
        {availableSizes.map((value) => (
          <li key={value} className="checkbox-item">
            <input
              id={value}
              name="sizes"
              value={value}
              type="checkbox"
              checked={values.sizes.includes(value)}
              onChange={toggleValue}
            />
            <label htmlFor={value}>{value}</label>
          </li>
        ))}
      </ul>
      <ul className="checkbox-list">
        {colors.map((value) => (
          <li key={value} className="checkbox-item">
            <input
              id={value}
              type="checkbox"
              name="colors"
              value={value}
              checked={values.colors.includes(value)}
              onChange={toggleValue}
            />
            <label htmlFor={value}>{value}</label>
          </li>
        ))}
      </ul>

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
