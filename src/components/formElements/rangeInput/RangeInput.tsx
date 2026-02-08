import { ChangeInputType } from '../../../types/types';

export type RangeInputProps = {
  id: string;
  max: number;
  min: number;
  name: string;
  step: number;
  value: number;
  onChange: (event: ChangeInputType) => void;
};

const RangeInput = ({
  max,
  min,
  value,
  onChange,
  name,
  id,
  step,
}: RangeInputProps) => (
  <input
    type="range"
    name={name}
    id={id}
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={onChange}
    className="range-slider"
    aria-label="Minimum pris"
  />
);

export default RangeInput;
