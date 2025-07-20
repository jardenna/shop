import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import ProductSizeItem from './ProductSizeItem';
import ProductSizeList from './ProductSizeList';

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
  <ProductSizeList
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
  </ProductSizeList>
);

export default SizeListChooseSingle;
