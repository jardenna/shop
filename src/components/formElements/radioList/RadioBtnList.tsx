import { InputChangeHandler, OptionType } from '../../../types/types';
import ControlInput from '../ControlInput';
import './_radio_btn_list.scss';

interface RadioBtnListProps {
  name: string;
  onChange: InputChangeHandler;
  radioButtonList: OptionType[];
  value: string;
}

const RadioBtnList = ({
  radioButtonList,
  value,
  onChange,
  name,
}: RadioBtnListProps) => (
  <ul className="secondary-radio">
    {radioButtonList.map((radio) => (
      <li key={radio.label} className="secondary-radio-container">
        <ControlInput
          type="radio"
          name={name}
          id={radio.label}
          value={radio.value}
          checked={value === radio.value}
          onChange={onChange}
          label={radio.label}
        />
      </li>
    ))}
  </ul>
);

export default RadioBtnList;
