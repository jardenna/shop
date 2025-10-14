import { useSearchParams } from 'react-router';
import { productsPerPageParamKey } from '../utils/utils';
import FieldSet from './fieldset/FieldSet';
import Selectbox from './selectbox/Selectbox';

export type PageCountOptions = {
  label: string;
  value: string;
};

type ProductCountSelectProps = {
  defaultValue: PageCountOptions;
  labelText: string;
  options: PageCountOptions[];
};

const ProductCountSelect = ({
  labelText,
  options,
  defaultValue,
}: ProductCountSelectProps) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSelectCount = (option: PageCountOptions) => {
    const newParams = new URLSearchParams(searchParams);
    newParams.set(productsPerPageParamKey, option.value);
    setSearchParams(Object.fromEntries(newParams.entries()));
  };

  return (
    <form className="product-navigation-form">
      <FieldSet legendText="displayOptions">
        <Selectbox
          name="productCount"
          options={options}
          id="productCount"
          onChange={handleSelectCount}
          labelText={labelText}
          defaultValue={defaultValue}
          inputHasNoLabel
        />
      </FieldSet>
    </form>
  );
};

export default ProductCountSelect;
