import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import ProductSizeList from './ProductSizeList';
import ProductSizeText from './ProductSizeText';

type SizeListRadioboxtProps = {
  initialChecked: string;
  name: string;
  sizeList: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListRadiobox = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  optionGroupTitle,
  name,
}: SizeListRadioboxtProps) => (
  <>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={name}
      />
    )}
    <ProductSizeList ariaId={name}>
      {sizeList.map((size) => (
        <li key={size} className="product-size-item">
          <ProductSizeText htmlFor={size} text={size} />
          <input
            type="radio"
            name={name}
            id={size}
            value={size}
            checked={initialChecked === size}
            onChange={onChange}
          />
        </li>
      ))}
    </ProductSizeList>
  </>
);

export default SizeListRadiobox;
