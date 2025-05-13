import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType, OptionType } from '../../types/types';
import Input from './Input';

export type RadioBtnVariant = 'card';

type RadioButtonProps = {
  initialChecked: string;
  name: string;
  radioButtonList: OptionType[];
  formInfoText?: string;
  radioBtnVariant?: string;
  onChange: (event: ChangeInputType) => void;
};

const RadioButton = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  formInfoText,
  radioBtnVariant = '',
}: RadioButtonProps) => {
  const { language } = useLanguage();
  return (
    <div className={`${radioBtnVariant} radio-btn-container`}>
      {radioButtonList.map((radio) => (
        <Input
          type="radio"
          key={radio.value}
          id={radio.value}
          name={name}
          value={radio.value}
          checked={initialChecked === radio.value}
          onChange={onChange}
          labelText={language[radio.label] || radio.label}
        />
      ))}

      {formInfoText && <section className="form-info">{formInfoText}</section>}
    </div>
  );
};

export default RadioButton;
