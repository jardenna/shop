import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType, OptionGroupHeading } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListChooseSingletProps = {
  initialChecked: string;
  name: string;
  sizeList: ProductSizes[];
  errorText?: string;
  groupTitle?: OptionGroupHeading;
  onChange: (event: ChangeInputType) => void;
};

const SizeListChooseSingle = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  groupTitle,
  name,
}: SizeListChooseSingletProps) => (
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
