import { ChangeInputType } from '../../../types/types';

type CheckboxListProps = {
  name: string;
  options: string[];
  values: string[];
  onChange: (event: ChangeInputType) => void;
};

const CheckboxList = ({
  options,
  values,
  onChange,
  name,
}: CheckboxListProps) => (
  <ul className="checkbox-list">
    {options.map((label, index) => {
      const id = `${index}`;
      return (
        <li key={label} className="checkbox-item">
          <label htmlFor={id}>{label}</label>
          <input
            type="checkbox"
            id={id}
            name={name}
            value={label}
            checked={values.includes(label)}
            onChange={onChange}
          />
        </li>
      );
    })}
  </ul>
);

export default CheckboxList;
