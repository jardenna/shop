import { ChangeInputType } from '../../../types/types';
import Input from '../Input';

type RangeNumberInputProps = {
  id: string;
  labelText: string;
  max: number;
  min: number;
  name: string;
  step: number;
  value: string;
  inputSuffix?: string;
  onBlur: () => void;
  onChange: (event: ChangeInputType) => void;
};

const RangeNumberInput = ({
  max,
  min,
  value,
  onChange,
  name,
  onBlur,
  id,
  step,
  labelText,
  inputSuffix,
}: RangeNumberInputProps) => (
  <Input
    id={id}
    name={name}
    type="number"
    value={value}
    min={min}
    max={max}
    step={step}
    inputMode="numeric"
    onChange={onChange}
    onBlur={onBlur}
    labelText={labelText}
    inputSuffix={inputSuffix}
  />
);

export default RangeNumberInput;
