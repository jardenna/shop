import useCurrency from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import RangeNumberInput from './RangeNumberInput';
import RangeSliderInput from './RangeSliderInput';
import useRangeController from './useRangeController';

interface DualRangeProps {
  maxPrice: string;
  minPrice: string;
  unitLabel: string;
  max?: number;
  min?: number;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const DualRange = ({
  minPrice,
  maxPrice,
  onChange,
  step = 100,
  min = 0,
  max = 10000,
  unitLabel,
}: DualRangeProps) => {
  const { currencyText } = useCurrency();
  const {
    minInputValue,
    maxInputValue,
    minCommittedValue,
    maxCommittedValue,
    trackStartPercent,
    trackWidthPercent,
    commitMinInputValue,
    commitMaxInputValue,
    onRangeChange,
    setMinInputValue,
    setMaxInputValue,
  } = useRangeController({ minPrice, maxPrice, onChange });

  return (
    <>
      <div>
        <RangeNumberInput
          id="minPrice"
          name="minPrice"
          value={minInputValue}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            setMinInputValue(event.target.value);
          }}
          onBlur={() => {
            commitMinInputValue(minInputValue);
          }}
          labelText="Pris fra"
          inputSuffix={currencyText}
        />

        <RangeNumberInput
          id="maxPrice"
          name="maxPrice"
          value={maxInputValue}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            setMaxInputValue(event.target.value);
          }}
          onBlur={() => {
            commitMaxInputValue(maxInputValue);
          }}
          labelText="Pris til"
          inputSuffix={currencyText}
        />
      </div>

      <div className="dual-range">
        <output
          className="range-label range-label-min"
          style={{ left: `${trackStartPercent}%` }}
        >
          {minCommittedValue} {unitLabel}
        </output>

        <output
          className="range-label range-label-max"
          style={{
            left: `${trackStartPercent + trackWidthPercent}%`,
          }}
        >
          {maxCommittedValue} {unitLabel}
        </output>

        <div className="slider-track" />

        <div
          className="slider-track-filled"
          style={{
            left: `${trackStartPercent}%`,
            width: `${trackWidthPercent}%`,
          }}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={minCommittedValue}
          onChange={onRangeChange}
          name="minPrice"
          id="min"
          step={step}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={maxCommittedValue}
          onChange={onRangeChange}
          name="maxPrice"
          id="max"
          step={step}
        />
      </div>
    </>
  );
};

export default DualRange;
