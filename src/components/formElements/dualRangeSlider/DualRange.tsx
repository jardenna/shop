import { useCurrency } from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import DualRangeSlider from './DualRangeSlider';
import RangeNumberInput from './RangeNumberInput';
import { InputUtils, useRangeController } from './useRangeController';

interface DualRangeProps {
  inputLabels: InputUtils;
  inputNames: InputUtils;
  maxValue: string;
  minValue: string;
  unitLabel: string;
  max?: number;
  min?: number;
  standAlone?: boolean;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const DualRange = ({
  minValue,
  maxValue,
  onChange,
  step = 100,
  min = 0,
  max = 10000,
  inputNames,
  inputLabels,
  unitLabel,
  standAlone = false,
}: DualRangeProps) => {
  const { currencyText } = useCurrency();

  const { input, committed, track, onRangeChange } = useRangeController({
    minValue,
    maxValue,
    onChange,
    inputNames,
    min,
    max,
  });

  return (
    <div role="group">
      {!standAlone && (
        <div className="dual-number-range">
          <RangeNumberInput
            inputHasNoLabel
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
            inputHasNoLabel
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
      )}
      <DualRangeSlider
        track={track}
        max={max}
        min={min}
        step={step}
        unitLabel={unitLabel}
        onChange={onRangeChange}
        committed={committed}
        inputNames={inputNames}
        inputLabels={inputLabels}
        hideOutput
      />
    </div>
  );
};

export default DualRange;
