import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeList = {
  label: ProductSizes;
  value: ProductSizes;
};

type SizeListChooseMultipleProps = {
  name: string;
  sizeList: SizeList[];
  values: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListChooseMultiple = ({
  onChange,
  values,
  errorText,
  sizeList,
  optionGroupTitle,
  name,
}: SizeListChooseMultipleProps) => (
  <div>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={name}
      />
    )}
    <ProductList ariaId={name}>
      {sizeList.map(({ label, value }) => (
        <ProductListItem key={label} htmlFor={label} text={label}>
          <input
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
            checked={values.includes(value)}
            id={label}
          />
        </ProductListItem>
      ))}
    </ProductList>
  </div>
);

export default SizeListChooseMultiple;
