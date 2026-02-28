import Form from '../components/form/Form';
import ControlInput from '../components/formElements/ControlInput';
import DualRange from '../components/formElements/dualRangeSlider/DualRange';
import useCurrency from '../features/currency/useCurrency';
import useLanguage from '../features/language/useLanguage';
import useSearchParamsState from '../hooks/useSearchParamsState';
import { sortColorsByTranslation } from '../utils/colorUtils';
import { availableBrands, availableSizes, colors } from '../utils/filters';
import { translateKey } from '../utils/utils';

const ParamsPage = () => {
  const { currencyText } = useCurrency();
  const { language } = useLanguage();
  const initialFilters = {
    sizes: [] as string[],
    colors: [] as string[],
    brand: [] as string[],
    minPrice: '',
    maxPrice: '',
  };

  const { values, toggleValue, setValue } =
    useSearchParamsState(initialFilters);
  const sortedTranslatedColors = sortColorsByTranslation(colors, language);

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
        rangeLabel={language.priceRange}
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
        {sortedTranslatedColors.map((value) => (
          <li key={value} className="checkbox-item">
            <ControlInput
              id={value}
              type="checkbox"
              name="colors"
              value={value}
              checked={values.colors.includes(value)}
              onChange={toggleValue}
              label={translateKey(value, language)}
            />
          </li>
        ))}
      </ul>
    </Form>
  );
};

export default ParamsPage;
