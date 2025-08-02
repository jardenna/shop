import { Size } from '../../app/api/apiTypes/sharedApiTypes';
import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';

type SizeListSingleChoiceProps = ProductListChoiceProps & {
  availableSizeList: Size[];
  displaySizeList: Size[];
  initialChecked: string;
};

const SizeListSingleChoice = ({
  initialChecked,
  onChange,
  groupTitle,
  name,
  availableSizeList,
  displaySizeList,
}: SizeListSingleChoiceProps) => (
  <ProductList groupTitle={groupTitle}>
    {displaySizeList.map((size) => (
      <li key={size} className="product-list-item size-list-item">
        <label htmlFor={size} className="product-label">
          {size}
        </label>
        <input
          type="radio"
          name={name}
          id={size}
          value={size}
          checked={initialChecked === size}
          onChange={onChange}
          disabled={!availableSizeList.includes(size)}
        />
      </li>
    ))}
  </ProductList>
);

export default SizeListSingleChoice;
