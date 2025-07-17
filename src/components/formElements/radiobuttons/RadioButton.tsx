import useLanguage from '../../../features/language/useLanguage';
import { IconName } from '../../../types/enums';
import type { ChangeInputType, OptionType } from '../../../types/types';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import Input from '../Input';
import './_radio-button.scss';

type RadioBtnVariant = 'card';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  formInfoText?: string;
  iconName?: IconName;
  radioBtnVariant?: RadioBtnVariant;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  iconName,
  formInfoText,
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
          id={radio.value}
          name={name}
          value={radio.value}
          checked={initialChecked === radio.value}
          onChange={onChange}
          labelText={getlowerCaseFirstLetter(radio.label, language)}
          iconName={iconName}
        />
      ))}
      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </div>
  );
};

export default RadioButton;
