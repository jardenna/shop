import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListChooseSingleProps = ProductListChoiceProps & {
  initialChecked: string;
  sizeList: ProductSizes[];
};

const SizeListChooseSingle = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  groupTitle,
  name,
}: SizeListChooseSingleProps) => (
  <ProductList errorText={errorText} groupTitle={groupTitle}>
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

export default SizeListChooseSingle;
