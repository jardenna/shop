import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeList = {
  label: string;
  value: string;
};

type SizeListMultiChoiceProps = ProductListChoiceProps & {
  sizeList: SizeList[];
  values: string[];
  infoText?: string;
};

const SizeListMultiChoice = ({
  onChange,
  values,
  sizeList,
  name,
  infoText,
  groupTitle,
}: SizeListMultiChoiceProps) => (
  <ProductList groupTitle={groupTitle}>
    {sizeList.map(({ label, value }) => (
      <ProductListItem key={label} htmlFor={label} text={label}>
        <input
          type="checkbox"
          name={name}
          value={value}
          onChange={onChange}
          checked={values.includes(value)}
          id={label}
        />
      </ProductListItem>
    ))}
    {infoText && infoText}
  </ProductList>
);

export default SizeListMultiChoice;
