import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import { OptionGroupTitle1 } from './OptionGroupTitle';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeListChooseSingletProps = {
  initialChecked: string;
  name: string;
  sizeList: ProductSizes[];
  errorText?: string;
  groupTitle?: OptionGroupTitle1;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListChooseSingle = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  optionGroupTitle,
  groupTitle,
  name,
}: SizeListChooseSingletProps) => (
  <ProductList
    ariaId={name}
    optionGroupTitle={optionGroupTitle}
    errorText={errorText}
    groupTitle={groupTitle}
  >
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
