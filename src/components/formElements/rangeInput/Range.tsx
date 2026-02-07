import { useId } from 'react';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import useRangeController from './useRangeController';

interface RangeProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
  max?: number;
  min?: number;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const Range = ({
  minPrice,
  maxPrice,
  onChange,
  step = 100,
  min = 0,
  max = 10000,
}: RangeProps) => {
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
    <fieldset className="price-filter" aria-describedby={describedById}>
      <legend>Pris</legend>

      <div className="price-slider-container">
        <div className="slider-track-bg" />
        <div
          className="slider-track-filled"
          style={{
            left: `${leftPercent}%`,
            width: `${widthPercent}%`,
          }}
        />

        <input
          type="range"
          name="minPrice"
          id="min"
          min={min}
          max={max}
          step={step}
          value={minimumValue}
          onChange={onRangeChange}
          className="price-slider"
          aria-label="Minimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={minimumValue}
          aria-valuetext={`${minimumValue} kroner`}
        />

        <input
          type="range"
          name="maxPrice"
          id="max"
          min={min}
          max={max}
          step={step}
          value={maximumValue}
          onChange={onRangeChange}
          className="price-slider"
          aria-label="Maksimum pris"
          aria-valuemin={min}
          aria-valuemax={max}
          aria-valuenow={maximumValue}
          aria-valuetext={`${maximumValue} kroner`}
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
    </fieldset>
  );
};

export default Range;
