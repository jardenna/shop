import { useState } from 'react';
import VisuallyHidden from '../../components/VisuallyHidden';
import { ChangeInputType } from '../../types/types';
import './_range-slider.scss';

const RangeSlider = () => {
  const min = 0;
  const max = 100;
  const step = 1;

  const [minValue, setMinValue] = useState(min);
  const [maxValue, setMaxValue] = useState(max);
  const minPos = ((minValue - min) / (max - min)) * 100;
  const maxPos = ((maxValue - min) / (max - min)) * 100;

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
    <div className="range-slider">
      <div className="input-wrapper">
        <div>
          <VisuallyHidden>
            <label htmlFor="min">Min</label>
          </VisuallyHidden>
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
          <VisuallyHidden>
            <label htmlFor="max">Max</label>
          </VisuallyHidden>
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
      </div>

      <div className="rail">
        <div
          className="inner-rail"
          style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
        />
      </div>
    </div>
  );
};

export default RangeSlider;
