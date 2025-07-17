import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import Checkbox from '../formElements/checkbox/Checkbox';

type CheckboxSizeListProps = {
  errorText: string;
  sizes: ProductSizes[];
  onChange: (event: ChangeInputType) => void;
};

const CheckboxSizeList = ({
  onChange,
  sizes,
  errorText,
}: CheckboxSizeListProps) => {
  const { language } = useLanguage();

  const checkBoxList = [
    { value: 'S', label: 'S' },
    { value: 'M', label: 'M' },
    { value: 'L', label: 'L' },
    { value: 'XL', label: 'XL' },
    { value: 'Onesize', label: 'Onesize' },
  ];
  return (
    <div>
      <span className="form-span-container">
        {language.sizes}
        <span className="error-message">{errorText}</span>
      </span>
      <Checkbox
        onChange={onChange}
        values={sizes}
        checkBoxList={checkBoxList}
        name="sizes"
      />
    </div>
  );
};

export default CheckboxSizeList;
