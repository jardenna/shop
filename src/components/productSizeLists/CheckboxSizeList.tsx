import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';

type SizeList = {
  label: ProductSizes;
  value: ProductSizes;
};

type CheckboxSizeListProps = {
  name: string;
  sizeList: SizeList[];
  values: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
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
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={name}
      />
    )}
    <ul className="product-size-list" id={name}>
      {sizeList.map(({ label, value }) => (
        <li key={label} className="product-size-item">
          <label htmlFor={label} className="product-size">
            {label}
          </label>
          <input
            type="checkbox"
            name={name}
            value={value}
            onChange={onChange}
            checked={values.includes(value)}
            id={label}
          />
        </li>
      ))}
    </ul>
  </div>
);

export default CheckboxSizeList;
