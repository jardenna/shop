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
    <div className="range-slider" aria-labelledby="price-range-label">
      <VisuallyHidden id="price-range-label">Price range</VisuallyHidden>
      <div className="range-input-container">
        <VisuallyHidden as="label" htmlFor="minPriceSliderInput">
          Minimum price kr
        </VisuallyHidden>
        <input
          className="input range-start"
          type="range"
          value={minValue}
          min={min}
          max={max}
          name="min"
          id="minPriceSliderInput"
          step={step}
          onChange={handleRangeChange}
        />
        <VisuallyHidden as="label" htmlFor="maxPriceSliderInput">
          Maximum price kr
        </VisuallyHidden>
        <input
          className="input range-end"
          type="range"
          value={maxValue}
          min={min}
          name="max"
          id="maxPriceSliderInput"
          max={max}
          step={step}
          onChange={handleRangeChange}
        />
      </div>
      <div className="control-container">
        <span
          className="control control-start"
          style={{ left: `${minPos}%` }}
        />
        <span className="rail">
          <span
            className="inner-rail"
            style={{ left: `${minPos}%`, right: `${100 - maxPos}%` }}
          />
        </span>
        <span className="control control-end" style={{ left: `${maxPos}%` }} />
      </div>
    </div>
  );
};

export default RangeSlider;
