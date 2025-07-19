import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import { ChangeInputType } from '../../types/types';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';
import ProductSizeList from './ProductSizeList';
import ProductSizeText from './ProductSizeText';

type SizeList = {
  label: ProductSizes;
  value: ProductSizes;
};

type SizeListCheckboxProps = {
  name: string;
  sizeList: SizeList[];
  values: ProductSizes[];
  errorText?: string;
  optionGroupTitle?: string;
  onChange: (event: ChangeInputType) => void;
};

const SizeListCheckbox = ({
  onChange,
  values,
  errorText,
  sizeList,
  optionGroupTitle,
  name,
}: SizeListCheckboxProps) => (
  <div>
    {optionGroupTitle && (
      <OptionGroupTitle
        errorText={errorText}
        text={optionGroupTitle}
        id={name}
      />
    )}
    <ProductSizeList ariaId={name}>
      {sizeList.map(({ label, value }) => (
        <li key={label} className="product-size-item">
          <ProductSizeText htmlFor={label} text={label} />
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
    </ProductSizeList>
  </div>
);

export default SizeListCheckbox;
