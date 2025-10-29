import { useState } from 'react';
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
    <div className="wrapper">
      <div className="input-wrapper">
        <input
          className="input range-start"
          type="range"
          value={minValue}
          min={min}
          max={max}
          name="min"
          step={step}
          onChange={handleRangeChange}
        />
        <input
          className="input range-end"
          type="range"
          value={maxValue}
          min={min}
          name="max"
          max={max}
          step={step}
          onChange={handleRangeChange}
        />
      </div>
      <div className="control-wrapper">
        <div className="control control-start" style={{ left: `${minPos}%` }} />
        <div className="rail">
          <div
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </div>
        <div className="control control-end" style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};

export default RangeSlider;
