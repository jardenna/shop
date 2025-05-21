import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType, OptionType } from '../../types/types';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Input from './Input';

export type RadioBtnVariant = 'card';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  formInfoText?: string;
  radioBtnVariant?: RadioBtnVariant;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
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
        />
      ))}
      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </div>
  );
};

export default RadioButton;
