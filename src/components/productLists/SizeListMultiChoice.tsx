import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeList = {
  label: ProductSizes;
  value: ProductSizes;
};

type SizeListMultiChoiceProps = ProductListChoiceProps & {
  sizeList: SizeList[];
  values: ProductSizes[];
};

const SizeListMultiChoice = ({
  onChange,
  values,
  sizeList,
  name,
  groupTitle,
}: SizeListMultiChoiceProps) => (
  <ProductList groupTitle={groupTitle}>
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

export default SizeListMultiChoice;
