import { useState } from 'react';
import { ChangeInputType } from '../../types/types';
import './_range-slider.scss';

const RangeSlider = () => {
  const min = 0;
  const max = 100;
  const step = 1;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const numericValue = parseFloat(value);

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
