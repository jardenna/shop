import { useState } from 'react';
import { ChangeInputType } from '../types/types';

const RangeSlider = () => {
  const min = 0;
  const max = 100;
  const step = 5;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

    // Note: We clamp values so the slider never crosses over
    if (name === 'min') {
      const safeValue = Math.min(numericValue, maxValue - step);
      setMinValue(safeValue);
    } else {
      const safeValue = Math.max(numericValue, minValue + step);
      setMaxValue(safeValue);
    }
  };

  return (
    <section>
      <div>
        <label htmlFor="min">Min</label>
        <input
          type="range"
          value={minValue}
          onChange={handleRangeChange}
          min={min}
          max={max}
          step={step}
          name="min"
          id="min"
        />
      </div>
      <div>
        <label htmlFor="max">Max</label>
        <input
          type="range"
          value={maxValue}
          onChange={handleRangeChange}
          min={min}
          max={max}
          step={step}
          name="max"
          id="max"
        />
      </div>
    </section>
  );
};

export default RangeSlider;
