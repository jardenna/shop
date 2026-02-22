import { ChangeInputType } from '../../../types/types';

interface RangeSliderInputProps {
  ariaValuetext: string;
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
  ariaValuetext,
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
    aria-valuetext={ariaValuetext}
  />
);

export default RangeSliderInput;
