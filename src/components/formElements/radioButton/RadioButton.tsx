import { FC } from 'react';
import { ChangeInputType } from '../../../types/types';
import Input from '../Input';
import './_radio-button.scss';

export interface RadioListItem {
  id: string;
  labelText: string;
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
        key={radio.id}
        id={radio.id}
        name={name}
        value={radio.id}
        checked={initialChecked === radio.id}
        onChange={onChange}
        labelText={radio.labelText}
        className="visibility-hidden"
      />
    ))}

    {formInfoText && <section className="form-info">{formInfoText}</section>}
  </>
);

export default RadioButton;
