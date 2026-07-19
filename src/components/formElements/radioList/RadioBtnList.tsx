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
    <ul className="secondary">
      {list.map((a) => (
        <li key={a.label}>
          <div>
            <label htmlFor={a.label}>{a.label}</label>
            <input
              type="radio"
              name="rating"
              id={a.label}
              value={a.value}
              checked={values.rating === a.value}
              onChange={onChange}
            />
          </div>
        </li>
      ))}
    </ul>
  );
};

export default RadioBtnList;
