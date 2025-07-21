import useLanguage from '../../../features/language/useLanguage';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Input from '../Input';
import InputInfo from '../InputInfo';
import './_radio-button.scss';

type RadioBtnVariant = 'card';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  inputInfo?: string;
  radioBtnVariant?: RadioBtnVariant;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  inputInfo,
  radioBtnVariant,
}: RadioButtonProps) => {
  const { language } = useLanguage();

  return (
    <div
      className={`radio-btn-container ${radioBtnVariant ? `radio-${radioBtnVariant}` : ''}`}
    >
      {radioButtonList.map((radio) => (
        <Input
          type="radio"
          key={radio.value}
          id={radio.label}
          name={name}
          value={radio.value}
          checked={initialChecked === radio.value}
          onChange={onChange}
          labelText={getlowerCaseFirstLetter(radio.label, language)}
        />
      ))}
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </div>
  );
};

export default RadioButton;
