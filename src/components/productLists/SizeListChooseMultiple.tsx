import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import { OptionGroupTitle1 } from './OptionGroupTitle';
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
  groupTitle?: OptionGroupTitle1;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListChooseMultiple = ({
  onChange,
  values,
  errorText,
  sizeList,
  name,
  groupTitle,
}: SizeListChooseMultipleProps) => (
  <ProductList ariaId={name} groupTitle={groupTitle} errorText={errorText}>
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
);

export default SizeListChooseMultiple;
