import { FC } from 'react';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_radio-button.scss';

export interface RadioListItem<T = string> {
  label: string;
  value: T;
}

export type RadioBtnVariant = 'card';
interface RadioButtonProps {
  initialChecked: string;
  name: string;
  radioButtonList: RadioListItem[];
  formInfoText?: string;
  radioBtnVariant?: string;
  onChange: (event: ChangeInputType) => void;
}

const RadioButton: FC<RadioButtonProps> = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  formInfoText,
  radioBtnVariant = '',
}) => (
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
        labelText={radio.label}
        className="visibility-hidden"
      />
    ))}

    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </div>
);

export default RadioButton;
