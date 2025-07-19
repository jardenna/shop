import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';

type SizeList = {
  label: ProductSizes;
  value: ProductSizes;
};

type CheckboxSizeListProps = {
  name: string;
  optionGroupTitle: string;
  sizeList: SizeList[];
  values: ProductSizes[];
  errorText?: string;
  onChange: (event: ChangeInputType) => void;
};

const CheckboxSizeList = ({
  onChange,
  values,
  errorText,
  sizeList,
  optionGroupTitle,
  name,
}: CheckboxSizeListProps) => (
  <div>
    <OptionGroupTitle
      errorText={errorText}
      text={optionGroupTitle}
      id="sizes"
    />
    <ul className="product-size-list" id="sizes">
      {sizeList.map((checkbox) => (
        <li key={checkbox.label} className="product-size-item">
          <label htmlFor={checkbox.label} className="product-size">
            {checkbox.label}
          </label>
          <input
            type="checkbox"
            name={name}
            value={checkbox.value}
            onChange={onChange}
            checked={values.includes(checkbox.value)}
            id={checkbox.label}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default CheckboxSizeList;
