import { Size } from '../app/api/apiTypes/sharedApiTypes';
import useFormValidation from '../hooks/useFormValidation';
import CheckboxList from './formElements/checkbox/CheckboxList';

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
      <CheckboxList
        options={options}
        name="sizes"
        onChange={onChange}
        values={values.sizes}
      />
      <button type="submit">Submit</button>
    </form>
  );
};

export default CheckboxForm;
