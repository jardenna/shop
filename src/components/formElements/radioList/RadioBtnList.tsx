import { useFormValidation } from '../../../hooks/useFormValidation';
import Input from '../Input';
import './_radio_btn_list.scss';

const RadioBtnList = () => {
  const initialState = {
    rating: 'value1',
  };
  const list = [
    {
      label: 'label1',
      value: 'value1',
    },
    {
      label: 'label2',
      value: 'value2',
    },
  ];

  const { values, onChange } = useFormValidation({
    initialState,
  });

  return (
    <ul className="secondary-radio">
      {list.map((a) => (
        <li key={a.label}>
          <Input
            type="radio"
            name="rating"
            id={a.label}
            value={a.value}
            checked={values.rating === a.value}
            onChange={onChange}
            labelText={a.label}
          />
        </li>
      ))}
    </ul>
  );
};

export default RadioBtnList;
