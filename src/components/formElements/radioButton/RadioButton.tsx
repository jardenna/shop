import { FC } from 'react';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_radio-button.scss';

export interface RadioListItem {
  label: string;
  value: string;
}

interface RadioButtonProps {
  initialChecked: string;
  name: string;
  radioButtonList: RadioListItem[];
  formInfoText?: string;
  onChange: (event: ChangeInputType) => void;
}

const RadioButton: FC<RadioButtonProps> = ({
  initialChecked,
  radioButtonList,
  onChange,
  name,
  formInfoText,
}) => (
  <>
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
  </>
);

export default RadioButton;
