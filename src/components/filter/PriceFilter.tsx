import { useId, useState } from 'react';
import useDebounce from '../../hooks/useDebounce';
import { ChangeInputType } from '../../types/types';
import './_filter.scss';

interface PriceFilterProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
  max?: number;
  min?: number;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const clampNumberToRange = (
  value: number,
  lowerBound: number,
  upperBound: number,
) => Math.min(upperBound, Math.max(lowerBound, value));

const parseFiniteNumberOrNull = (rawValue: string) => {
  if (rawValue.trim() === '') {
    return null;
  }

  const parsedValue = Number(rawValue);
  return Number.isFinite(parsedValue) ? parsedValue : null;
};

const PriceFilter = ({
  minPrice,
  maxPrice,

  onChange,
  step = 100,
  min = 0,
  max = 10000,
}: PriceFilterProps) => {
  const describedById = useId();
  const { debounce } = useDebounce();

  // Canonical numeric values (used by range inputs + output)
  const [minimumValue, setMinimumValue] = useState(() =>
    clampNumberToRange(Number(minPrice || min), min, max),
  );
  const [maximumValue, setMaximumValue] = useState(() =>
    clampNumberToRange(Number(maxPrice || max), min, max),
  );

  // Draft values for typing (used by number inputs)
  const [minimumDraft, setMinimumDraft] = useState(() =>
    String(clampNumberToRange(Number(minPrice || min), min, max)),
  );
  const [maximumDraft, setMaximumDraft] = useState(() =>
    String(clampNumberToRange(Number(maxPrice || max), min, max)),
  );

  const commitRangeValue = (
    rawValue: string,
    currentValue: number,
    lowerBound: number,
    upperBound: number,
    setValue: (value: number) => void,
    setDraft: (value: string) => void,
    outputName: 'minPrice' | 'maxPrice',
  ) => {
    const parsedValue = parseFiniteNumberOrNull(rawValue);

    if (parsedValue === null) {
      setDraft(String(currentValue));
      return;
    }

    const committedValue = clampNumberToRange(
      parsedValue,
      lowerBound,
      upperBound,
    );

    setValue(committedValue);
    setDraft(String(committedValue));

    debounce(() => {
      onChange({
        target: {
          name: outputName,
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const commitMinimumValue = (rawValue: string) => {
    commitRangeValue(
      rawValue,
      minimumValue,
      min,
      maximumValue,
      setMinimumValue,
      setMinimumDraft,
      'minPrice',
    );
  };

  const commitMaximumValue = (rawValue: string) => {
    commitRangeValue(
      rawValue,
      maximumValue,
      minimumValue,
      max,
      setMaximumValue,
      setMaximumDraft,
      'maxPrice',
    );
  };

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const isMinimumHandle = name === 'minPrice';

    const committedValue = clampNumberToRange(
      numericValue,
      isMinimumHandle ? min : minimumValue,
      isMinimumHandle ? maximumValue : max,
    );

    if (isMinimumHandle) {
      setMinimumValue(committedValue);
      setMinimumDraft(String(committedValue));
    } else {
      setMaximumValue(committedValue);
      setMaximumDraft(String(committedValue));
    }

    debounce(() => {
      onChange({
        target: {
          name: isMinimumHandle ? 'minimumPrice' : 'maximumPrice',
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const leftPercent = ((minimumValue - min) / (max - min)) * 100;
  const widthPercent = ((maximumValue - minimumValue) / (max - min)) * 100;

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
          onChange={handleRangeChange}
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
          onChange={handleRangeChange}
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

export default PriceFilter;
