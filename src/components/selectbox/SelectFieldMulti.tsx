import { useFormValidation } from '../../hooks/useFormValidation';
import BrandOptions from './BrandOptions';
import SelectboxNew from './SelectboxNew';

export interface BrandProps {
  label: string;
  value: string;
}

interface InitialCookiesValues {
  brands: readonly BrandProps[];
}

const SelectFieldMulti = () => {
  const brandOptions: BrandProps[] = [
    { value: 'nike', label: 'Nike' },
    { value: 'adidas', label: 'Adidas' },
    { value: 'puma', label: 'Puma' },
  ];

  const initialState: InitialCookiesValues = {
    brands: [],
  };

  const { values, onSelectChange } = useFormValidation({
    initialState,
  });
  return (
    <SelectboxNew
      name="brands"
      labelText="Brands"
      options={brandOptions}
      value={values.brands}
      onChange={onSelectChange}
      isMulti
      isClearable
      closeMenuOnSelect={false}
      components={{ Option: BrandOptions }}
      id="brands"
      isSearchable
      placeholder="sss"
    />
  );
};

export default SelectFieldMulti;
