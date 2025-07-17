import { ChangeInputType, OptionType } from '../../types/types';
import { resolveIconName } from '../../utils/iconHelpers';
import RadioButton from '../formElements/radiobuttons/RadioButton';
import './_product-color-list.scss';

type RadioColorListProps = {
  iconName: string;
  initialChecked: string;
  radioButtonList: OptionType[];

  onChange: (event: ChangeInputType) => void;
};

const RadioColorList = ({
  initialChecked,
  radioButtonList,
  onChange,
  iconName,
}: RadioColorListProps) => {
  console.log(initialChecked);

  return (
    <RadioButton
      radioButtonList={radioButtonList}
      name="colors"
      initialChecked={initialChecked}
      onChange={onChange}
      radioBtnVariant="card"
      iconName={resolveIconName(iconName)}
    />
  );
};

export default RadioColorList;
