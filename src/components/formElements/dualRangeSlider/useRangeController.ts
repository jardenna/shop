import { useEffect, useState } from 'react';
import { useDebounce } from '../../../hooks/useDebounce';
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

export const useRangeController = ({
  minValue,
  maxValue,
  onChange,
  min = 0,
  max = 10000,
  inputNames = { min: 'min', max: 'max' },
}: RangeControllerProps) => {
  const { debounce } = useDebounce();

  const normalizedMinValue = normalizeValueWithinRange(
    Number(minValue || min),
    min,
    max,
  );

  const normalizedMaxValue = normalizeValueWithinRange(
    Number(maxValue || max),
    min,
    max,
  );

  const [minCommittedValue, setMinCommittedValue] =
    useState(normalizedMinValue);
  const [maxCommittedValue, setMaxCommittedValue] =
    useState(normalizedMaxValue);

  const [minInputValue, setMinInputValue] = useState(
    String(normalizedMinValue),
  );
  const [maxInputValue, setMaxInputValue] = useState(
    String(normalizedMaxValue),
  );

  useEffect(() => {
    setMinCommittedValue(normalizedMinValue);
    setMinInputValue(String(normalizedMinValue));
  }, [normalizedMinValue]);

  useEffect(() => {
    setMaxCommittedValue(normalizedMaxValue);
    setMaxInputValue(String(normalizedMaxValue));
  }, [normalizedMaxValue]);

  const emitChange = (fieldName: string, fieldValue: number) => {
    debounce(() => {
      onChange({
        target: {
          name: fieldName,
          value: String(fieldValue),
        },
      } as ChangeInputType);
    });
  };

  const commitInputValue = (
    rawInputValue: string,
    fallbackValue: number,
    allowedMinimum: number,
    allowedMaximum: number,
    updateCommittedValue: (value: number) => void,
    updateInputValue: (value: string) => void,
    fieldName: string,
  ) => {
    const parsedNumber = parseFiniteNumberOrNull(rawInputValue);

    if (parsedNumber === null) {
      updateInputValue(String(fallbackValue));
      return;
    }

    const committedValue = normalizeValueWithinRange(
      parsedNumber,
      allowedMinimum,
      allowedMaximum,
    );

    updateCommittedValue(committedValue);
    updateInputValue(String(committedValue));

    emitChange(fieldName, committedValue);
  };

  const commitMinInputValue = (inputValue: string) => {
    commitInputValue(
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
    commitInputValue(
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
      emitChange(inputNames.min, committedValue);
      return;
    }

    setMaxCommittedValue(committedValue);
    setMaxInputValue(String(committedValue));
    emitChange(inputNames.max, committedValue);
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
