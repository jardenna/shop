import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import ProductList from './ProductList';
import ProductSizeItem from './ProductSizeItem';

type SizeListChooseSingletProps = {
  initialChecked: string;
  name: string;
  sizeList: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListChooseSingle = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  optionGroupTitle,
  name,
}: SizeListChooseSingletProps) => (
  <ProductList
    ariaId={name}
    optionGroupTitle={optionGroupTitle}
    errorText={errorText}
  >
    {sizeList.map((size) => (
      <ProductSizeItem key={size} htmlFor={size} text={size}>
        <input
          type="radio"
          name={name}
          id={size}
          value={size}
          checked={initialChecked === size}
          onChange={onChange}
        />
      </ProductSizeItem>
    ))}
  </ProductList>
);

export default SizeListChooseSingle;
