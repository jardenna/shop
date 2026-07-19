import { useFormValidation } from '../../../hooks/useFormValidation';

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
    <ul>
      {list.map((a) => (
        <li key={a.label}>
          <div>
            <label htmlFor={a.label}>{a.label}</label>
            <input
              type="radio"
              name="rating"
              id={a.label}
              onChange={onChange}
              value={values.rating}
              checked={values.rating === a.value}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RadioBtnList;
