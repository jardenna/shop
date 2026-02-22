import { useId } from 'react';
import useCurrency from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import VisuallyHidden from '../../VisuallyHidden';
import './_range.scss';
import DualRangeSlider from './DualRangeSlider';
import RangeNumberInput from './RangeNumberInput';
import useRangeController, { InputUtils } from './useRangeController';

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
  const groupLabelId = useId();

  const { input, committed, track, onRangeChange } = useRangeController({
    minValue,
    maxValue,
    onChange,
    inputNames,
  });

  return (
    <div role="group" aria-labelledby={groupLabelId}>
      <VisuallyHidden id={groupLabelId}>
        {`${inputLabels.min} to ${inputLabels.max}`}
      </VisuallyHidden>

      {!standAlone && (
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
      />
    </div>
  );
};

export default DualRange;
