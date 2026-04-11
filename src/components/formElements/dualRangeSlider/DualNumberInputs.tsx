import { useCurrency } from '../../../features/currency/useCurrency';
import type { ChangeInputType } from '../../../types/types';
import './_range.scss';
import RangeNumberInput from './RangeNumberInput';
import { InputUtils, useRangeController } from './useRangeController';

interface DualNumberInputsProps {
  inputLabels: InputUtils;
  inputNames: InputUtils;
  maxValue: string;
  minValue: string;
  max?: number;
  min?: number;
  step?: number;
  onBlur?: () => void;
  onChange: (event: ChangeInputType) => void;
}

const DualNumberInputs = ({
  minValue,
  maxValue,
  onChange,
  step = 100,
  min = 0,
  max = 10000,
  onBlur,
  inputNames,
  inputLabels,
}: DualNumberInputsProps) => {
  const { currencyText } = useCurrency();

  const { input } = useRangeController({
    minValue,
    maxValue,
    onChange,
    inputNames,
    min,
    max,
  });

  return (
    <div className="dual-number-range" role="group">
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
        onBlur={onBlur}
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
        onBlur={onBlur}
        labelText={inputLabels.max}
        inputSuffix={currencyText}
      />
    </div>
  );
};

export default DualNumberInputs;
