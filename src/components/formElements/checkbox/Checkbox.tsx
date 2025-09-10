import { ChangeInputType, InputType } from '../../../types/types';

type CheckboxProps = {
  checked: boolean;
  id: string;
  label: string;
  name: string;
  value: string;
  autoFocus?: boolean;
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
  autoFocus,
  className = 'checkbox-label',
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
      autoFocus={autoFocus}
    />
    <label htmlFor={id} className={className}>
      {label}
      {renderExtra}
    </label>
  </>
);

export default Checkbox;
