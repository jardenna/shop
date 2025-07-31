import { Size } from '../app/api/apiTypes/sharedApiTypes';
import useFormValidation from '../hooks/useFormValidation';

type CheckboxFormProps = {
  options: Size[];
};

type InitialValues = {
  email: string;
  sizes: Size[];
};

const CheckboxForm = ({ options }: CheckboxFormProps) => {
  const initialState: InitialValues = {
    sizes: [],
    email: '',
  };

  const { onChange, values, onSubmit } = useFormValidation<{
    email: string;
    sizes: Size[];
  }>({
    initialState,
    callback: () => {
      console.log(values);
    },
  });

  return (
    <form onSubmit={onSubmit}>
      <ul className="checkbox-list">
        {options.map((label, index) => {
          const id = `${index}`;
          return (
            <li key={label} className="checkbox-item">
              <label htmlFor={id}>{label}</label>
              <input
                type="checkbox"
                id={id}
                name="sizes"
                value={label}
                checked={values.sizes.includes(label)}
                onChange={onChange}
              />
            </li>
          );
        })}
      </ul>

      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckboxForm;
