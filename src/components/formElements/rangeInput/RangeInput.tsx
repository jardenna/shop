import { ChangeInputType } from '../../../types/types';

export type RangeInputProps = {
  ariaValuetext: string;
  id: string;
  max: number;
  min: number;
  name: string;
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
  ariaValuetext,
}: RangeInputProps) => (
  <input
    type="range"
    name={name}
    id={id}
    min={min}
    max={max}
    step={100}
    value={value}
    onChange={onChange}
    className="range-slider"
    aria-label="Maksimum pris"
    aria-valuemin={min}
    aria-valuemax={max}
    // aria-valuenow={maximumValue}
    aria-valuetext={ariaValuetext}
  />
);

export default RangeInput;
