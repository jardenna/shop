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

  const { input, committed, track, onRangeChange } = useRangeController({
    minPrice,
    maxPrice,
    onChange,
  });

  return (
    <>
      <div>
        <RangeNumberInput
          id="minPrice"
          name="minPrice"
          value={input.min}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            input.setMin(event.target.value);
          }}
          onBlur={() => {
            input.commitMin(input.min);
          }}
          labelText="Pris fra"
          inputSuffix={currencyText}
        />

        <RangeNumberInput
          id="maxPrice"
          name="maxPrice"
          value={input.max}
          min={min}
          max={max}
          step={step}
          onChange={(event) => {
            input.setMax(event.target.value);
          }}
          onBlur={() => {
            input.commitMax(input.max);
          }}
          labelText="Pris til"
          inputSuffix={currencyText}
        />
      </div>

      <div className="dual-range">
        <output
          className="range-label range-label-min"
          style={{ left: `${track.startPercent}%` }}
        >
          {committed.min} {unitLabel}
        </output>

        <output
          className="range-label range-label-max"
          style={{
            left: `${track.startPercent + track.widthPercent}%`,
          }}
        >
          {committed.max} {unitLabel}
        </output>

        <div className="slider-track" />

        <div
          className="slider-track-filled"
          style={{
            left: `${track.startPercent}%`,
            width: `${track.widthPercent}%`,
          }}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={committed.min}
          onChange={onRangeChange}
          name="minPrice"
          id="min"
          step={step}
        />

        <RangeSliderInput
          min={min}
          max={max}
          value={committed.max}
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
