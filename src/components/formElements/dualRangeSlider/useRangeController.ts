import { useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { ChangeInputType } from '../../../types/types';
import {
  normalizeValueWithinRange,
  parseFiniteNumberOrNull,
} from './rangeUtils';

export interface InputUtils {
  max: string;
  min: string;
}

interface RangeControllerProps {
  maxValue: string;
  minValue: string;
  inputNames?: InputUtils;
  max?: number;
  min?: number;
  onChange: (event: ChangeInputType) => void;
}

const useRangeController = ({
  minValue,
  maxValue,
  onChange,
  min = 0,
  max = 10000,
  inputNames = { min: 'min', max: 'max' },
}: RangeControllerProps) => {
  const { debounce } = useDebounce();

  const [minCommittedValue, setMinCommittedValue] = useState(() =>
    normalizeValueWithinRange(Number(minValue || min), min, max),
  );
  const [maxCommittedValue, setMaxCommittedValue] = useState(() =>
    normalizeValueWithinRange(Number(maxValue || max), min, max),
  );

  const [minInputValue, setMinInputValue] = useState(() =>
    String(normalizeValueWithinRange(Number(minValue || min), min, max)),
  );
  const [maxInputValue, setMaxInputValue] = useState(() =>
    String(normalizeValueWithinRange(Number(maxValue || max), min, max)),
  );

  const commitParsedInputValue = (
    rawInputValue: string,
    fallbackCommittedValue: number,
    allowedMinimum: number,
    allowedMaximum: number,
    updateCommittedValue: (value: number) => void,
    updateInputValue: (value: string) => void,
    outputFieldName: string,
  ) => {
    const parsedNumber = parseFiniteNumberOrNull(rawInputValue);

    if (parsedNumber === null) {
      updateInputValue(String(fallbackCommittedValue));
      return;
    }

    const committedValue = normalizeValueWithinRange(
      parsedNumber,
      allowedMinimum,
      allowedMaximum,
    );

    updateCommittedValue(committedValue);
    updateInputValue(String(committedValue));

    debounce(() => {
      onChange({
        target: {
          name: outputFieldName,
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const commitMinInputValue = (inputValue: string) => {
    commitParsedInputValue(
      inputValue,
      minCommittedValue,
      min,
      maxCommittedValue,
      setMinCommittedValue,
      setMinInputValue,
      inputNames.min,
    );
  };

  const commitMaxInputValue = (inputValue: string) => {
    commitParsedInputValue(
      inputValue,
      maxCommittedValue,
      minCommittedValue,
      max,
      setMaxCommittedValue,
      setMaxInputValue,
      inputNames.max,
    );
  };

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const parsedNumber = Number(value);

    if (!Number.isFinite(parsedNumber)) {
      return;
    }

    const isMinHandle = name === inputNames.min;

    const committedValue = normalizeValueWithinRange(
      parsedNumber,
      isMinHandle ? min : minCommittedValue,
      isMinHandle ? maxCommittedValue : max,
    );

    if (isMinHandle) {
      setMinCommittedValue(committedValue);
      setMinInputValue(String(committedValue));
    } else {
      setMaxCommittedValue(committedValue);
      setMaxInputValue(String(committedValue));
    }

    debounce(() => {
      onChange({
        target: {
          name: isMinHandle ? inputNames.min : inputNames.max,
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const trackStartPercent = ((minCommittedValue - min) / (max - min)) * 100;

  const trackWidthPercent =
    ((maxCommittedValue - minCommittedValue) / (max - min)) * 100;

  return {
    input: {
      min: minInputValue,
      max: maxInputValue,
      setMin: setMinInputValue,
      setMax: setMaxInputValue,
      commitMin: commitMinInputValue,
      commitMax: commitMaxInputValue,
    },
    committed: {
      min: minCommittedValue,
      max: maxCommittedValue,
    },
    track: {
      startPercent: trackStartPercent,
      widthPercent: trackWidthPercent,
    },
    onRangeChange: handleRangeChange,
  };
};

export default useRangeController;
