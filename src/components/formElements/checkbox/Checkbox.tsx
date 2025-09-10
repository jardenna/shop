import { ChangeInputType, InputType } from '../../../types/types';

type CheckboxProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  className?: string;
  language?: Record<string, string>;
  renderExtra?: any;
  type?: InputType;
  onChange: (event: ChangeInputType) => void;
};
const Checkbox = ({
  onChange,
  checked,
  name,
  id,
  value,
  label,
  renderExtra,
  type = 'checkbox',
}: CheckboxProps) => (
  <>
    <input
      type={type}
      name={name}
      id={id}
      value={value}
      onChange={onChange}
      checked={checked}
    />
    <label htmlFor={id} className="checkbox-label">
      {label}
      {renderExtra}
    </label>
  </>
);

export default Checkbox;
