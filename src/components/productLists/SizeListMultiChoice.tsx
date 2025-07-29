import { useEffect } from 'react';
import { ProductListChoiceProps } from '../../types/types';
import ProductList from './ProductList';
import ProductListItem from './ProductListItem';

type SizeList = {
  label: string;
  value: string;
};

type SizeListMultiChoiceProps = ProductListChoiceProps & {
  availableSizeList: SizeList[];
  values: string[];
  infoText?: string;
  required?: boolean;
};

const SizeListMultiChoice = ({
  onChange,
  values,
  availableSizeList,
  name,
  infoText,
  groupTitle,
  required,
}: SizeListMultiChoiceProps) => {
  useEffect(() => {
    if (availableSizeList.length === 1) {
      const onlyValue = availableSizeList[0].value;

      // Trigger only once at mount
      if (!values.includes(onlyValue)) {
        onChange({
          target: {
            name,
            value: onlyValue,
            checked: true,
            type: 'checkbox',
          },
        } as any);
      }
    }
  }, [availableSizeList, name, onChange]);

  return (
    <ProductList groupTitle={groupTitle} required={required}>
      {availableSizeList.map(({ label, value }) => (
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
};

export default SizeListMultiChoice;
