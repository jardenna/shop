import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListSingleChoiceProps = ProductListChoiceProps & {
  initialChecked: string;
  sizeList: ProductSizes[];
};

const SizeListSingleChoice = ({
  initialChecked,
  sizeList,
  onChange,
  groupTitle,
  name,
}: SizeListSingleChoiceProps) => (
  <ProductList groupTitle={groupTitle}>
    {sizeList.map((size) => (
      <ProductListItem key={size} htmlFor={size} text={size}>
        <input
          type="radio"
          name={name}
          id={size}
          value={size}
          checked={initialChecked === size}
          onChange={onChange}
        />
      </ProductListItem>
    ))}
  </ProductList>
);

export default SizeListSingleChoice;
