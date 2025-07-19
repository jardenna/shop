import { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';
import { sizeList } from '../../utils/utils';
import Checkbox from '../formElements/checkbox/Checkbox';
import OptionGroupTitle from '../formElements/radiobuttons/OptionGroupTitle';

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
  const checkBoxList = sizeList.map((size) => ({ value: size, label: size }));

  return (
    <div>
      <OptionGroupTitle errorText={errorText} text={language.sizes} />
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
