import Form from '../components/form/Form';
import DualRange from '../components/formElements/dualRangeSlider/DualRange';
import useCurrency from '../features/currency/useCurrency';
import useSearchParamsState from '../hooks/useSearchParamsState';
import { availableBrands, availableSizes, colors } from '../utils/filters';

const ParamsPage = () => {
  const { currencyText } = useCurrency();
  const initialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const { values, toggleValue, setValue } =
    useSearchParamsState(initialFilters);

  return (
    <Form
      submitBtnLabel="Search"
      onSubmit={() => {
        console.log(values);
      }}
    >
      <DualRange
        minValue={values.minPrice}
        maxValue={values.maxPrice}
        inputNames={{
          min: 'minPrice',
          max: 'maxPrice',
        }}
        inputLabels={{
          min: 'Pris fra',
          max: 'Pris til',
        }}
        onChange={setValue}
        unitLabel={currencyText}
      />

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
    </Form>
  );
};

export default ParamsPage;
