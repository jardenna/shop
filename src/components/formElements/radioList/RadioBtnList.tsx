import { InputChangeHandler, Options } from '../../../types/types';
import Input from '../Input';
import './_radio_btn_list.scss';

interface RadioBtnListProps {
  name: string;
  onChange: InputChangeHandler;
  radioList: Options[];
  value: string;
}

const RadioBtnList = ({
  radioList,
  value,
  onChange,
  name,
}: RadioBtnListProps) => (
  <ul className="secondary-radio">
    {radioList.map((radio) => (
      <li key={radio.label}>
        <Input
          type="radio"
          name={name}
          id={radio.label}
          value={radio.value}
          checked={value === radio.value}
          onChange={onChange}
          labelText={radio.label}
        />
      </li>
    ))}
  </ul>
);

export default RadioBtnList;
