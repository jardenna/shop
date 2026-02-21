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
  const {
    minimumDraft,
    maximumDraft,
    leftPercent,
    widthPercent,
    commitMinimumValue,
    commitMaximumValue,
    onRangeChange,
    minimumValue,
    maximumValue,
    setMaximumDraft,
    setMinimumDraft,
  } = useRangeController({ minPrice, maxPrice, onChange });
  return (
    <div className="dual-range">
      {' '}
      <div>
        <RangeNumberInput
          id="minPrice"
          name="minPrice"
          value={minimumDraft}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            setMinimumDraft(event.target.value);
          }}
          onBlur={() => {
            commitMinimumValue(minimumDraft);
          }}
          labelText="Pris fra"
        />

        <RangeNumberInput
          id="maxPrice"
          name="maxPrice"
          value={maximumDraft}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            setMaximumDraft(event.target.value);
          }}
          onBlur={() => {
            commitMaximumValue(maximumDraft);
          }}
          labelText="Pris til"
        />
      </div>
      <div className="dual-range-container">
        <output
          className="range-label range-label-min"
          style={{ left: `${leftPercent}%` }}
        >
          {minimumValue} {unitLabel}
        </output>

        <output
          className="range-label range-label-max"
          style={{ left: `${leftPercent + widthPercent}%` }}
        >
          {maximumValue} {unitLabel}
        </output>

        <div className="slider-track" />

        <div
          className="slider-track-filled"
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
          }}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={minimumValue}
          onChange={onRangeChange}
          name="minPrice"
          id="min"
          step={step}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={maximumValue}
          onChange={onRangeChange}
          name="maxPrice"
          id="max"
          step={step}
        />
      </div>
    </div>
  );
};

export default DualRange;
