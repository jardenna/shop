import useCurrency from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import RangeDual from './RangeDual';
import RangeNumberInput from './RangeNumberInput';
import useRangeController, { InputUtils } from './useRangeController';

interface DualRangeSliderProps {
  inputLabels: InputUtils;
  inputNames: InputUtils;
  maxValue: string;
  minValue: string;
  unitLabel: string;
  max?: number;
  min?: number;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const DualRangeSlider = ({
  minValue,
  maxValue,
  onChange,
  step = 100,
  min = 0,
  max = 10000,
  inputNames,
  inputLabels,
  unitLabel,
}: DualRangeSliderProps) => {
  const { currencyText } = useCurrency();

  const { input, committed, track, onRangeChange } = useRangeController({
    minValue,
    maxValue,
    onChange,
    inputNames,
  });

  return (
    <>
      <div>
        <RangeNumberInput
          id={inputNames.min}
          name={inputNames.min}
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
          labelText={inputLabels.min}
          inputSuffix={currencyText}
        />

        <RangeNumberInput
          id={inputNames.max}
          name={inputNames.max}
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
          labelText={inputLabels.max}
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
        inputNames={inputNames}
      />
    </>
  );
};

export default DualRangeSlider;
