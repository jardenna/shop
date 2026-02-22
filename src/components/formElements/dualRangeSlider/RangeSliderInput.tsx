import { ChangeInputType } from '../../../types/types';

interface RangeSliderInputProps {
  id: string;
  max: number;
  min: number;
  name: string;
  step: number;
  value: number;
  onChange: (event: ChangeInputType) => void;
}

const RangeSliderInput = ({
  max,
  min,
  value,
  onChange,
  name,
  id,
  step,
}: RangeSliderInputProps) => (
  <input
    type="range"
    name={name}
    id={id}
    min={min}
    max={max}
    step={step}
    value={value}
    onChange={onChange}
    className="range-slider-input"
  />
);

export default RangeSliderInput;
