import useCurrency from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import RangeDual from './RangeDual';
import RangeNumberInput from './RangeNumberInput';
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
    minValue: minPrice,
    maxValue: maxPrice,
    onChange,
    inputNames: {
      min: 'minPrice',
      max: 'maxPrice',
    },
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
      <RangeDual
        track={track}
        max={max}
        min={min}
        step={step}
        unitLabel={unitLabel}
        onRangeChange={onRangeChange}
        committed={committed}
      />
    </>
  );
};

export default DualRange;
