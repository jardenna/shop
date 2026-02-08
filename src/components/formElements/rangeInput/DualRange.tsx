import { useId } from 'react';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import RangeInput from './RangeInput';
import useRangeController from './useRangeController';

interface DualRangeProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
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
}: DualRangeProps) => {
  const describedById = useId();
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
    <>
      <div className="price-slider-container">
        <div className="slider-track-bg" />
        <div
          className="slider-track-filled"
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
          }}
        />
        <RangeInput
          min={min}
          max={max}
          value={minimumValue}
          onChange={onRangeChange}
          name="minPrice"
          id="min"
          step={step}
        />
        <RangeInput
          min={min}
          max={max}
          value={maximumValue}
          onChange={onRangeChange}
          name="maxPrice"
          id="max"
          step={step}
        />
      </div>
      <output id={describedById} className="price-display" aria-live="polite">
        {minimumValue} kr - {maximumValue} kr
      </output>
      <div className="price-inputs">
        <div className="price-input-group">
          <label htmlFor="minPrice">Min pris</label>
          <input
            id="minPrice"
            name="minPrice"
            type="number"
            value={minimumDraft}
            min={min}
            max={max}
            step={step}
            inputMode="numeric"
            onChange={(event) => {
              setMinimumDraft(event.target.value);
            }}
            onBlur={() => {
              commitMinimumValue(minimumDraft);
            }}
            aria-label="Indtast minimum pris"
          />
        </div>

        <div className="price-input-group">
          <label htmlFor="maxPrice">Max pris</label>
          <input
            id="maxPrice"
            name="maxPrice"
            type="number"
            value={maximumDraft}
            min={min}
            max={max}
            step={step}
            inputMode="numeric"
            onChange={(event) => {
              setMaximumDraft(event.target.value);
            }}
            onBlur={() => {
              commitMaximumValue(maximumDraft);
            }}
            aria-label="Indtast maksimum pris"
          />
        </div>
      </div>
    </>
  );
};

export default DualRange;
