import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType, OptionGroupHeading } from '../../types/types';
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
  groupTitle?: OptionGroupHeading;
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
  <ProductList groupTitle={groupTitle} errorText={errorText}>
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
