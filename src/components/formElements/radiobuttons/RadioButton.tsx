import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Input from '../Input';
import InputInfo from '../InputInfo';
import './_radio-button.scss';

export type RadioBtnVariant = 'card';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  iconName?: IconName;
  inputInfo?: string;
  radioBtnVariant?: RadioBtnVariant;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  radioButtonList,
  onChange,
  name,
  iconName,
  inputInfo,
  radioBtnVariant,
  initialChecked,
}: RadioButtonProps) => {
  const { language } = useLanguage();

  return (
    <div>
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
            iconName={iconName}
          />
        ))}
      </div>
      {inputInfo && <InputInfo inputInfo={inputInfo} />}
    </div>
  );
};

export default RadioButton;
