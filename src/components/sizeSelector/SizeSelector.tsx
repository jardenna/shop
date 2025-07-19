import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import './_size.scss';

type SizeSelectortProps = {
  initialChecked: string;
  name: string;
  sizeList: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeSelector = ({
  initialChecked,
  sizeList,
  onChange,
  errorText,
  optionGroupTitle,
  name,
}: SizeSelectortProps) => (
  <div>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={name}
      />
    )}
    <ul className="product-size-list">
      {sizeList.map((size) => (
        <li key={size} className="product-size-item">
          <label htmlFor={size} className="product-size">
            {size}
          </label>
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
    </ul>
  </div>
);

export default SizeSelector;
