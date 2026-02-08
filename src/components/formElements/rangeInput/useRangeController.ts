import { useState } from 'react';
import useDebounce from '../../../hooks/useDebounce';
import { ChangeInputType } from '../../../types/types';
import { clampNumberToRange, parseFiniteNumberOrNull } from './rangeUtils';

interface PriceFilterProps {
  maxPrice: string;
  minPrice: string;
  debounceMs?: number;
  max?: number;
  min?: number;
  step?: number;
  onChange: (event: ChangeInputType) => void;
}

const useRangeController = ({
  minPrice,
  maxPrice,
  onChange,
  min = 0,
  max = 10000,
}: PriceFilterProps) => {
  const { debounce } = useDebounce();

  // Canonical numeric values (used by range inputs + output)
  const [minimumValue, setMinimumValue] = useState(() =>
    clampNumberToRange(Number(minPrice || min), min, max),
  );
  const [maximumValue, setMaximumValue] = useState(() =>
    clampNumberToRange(Number(maxPrice || max), min, max),
  );

  // Draft values for typing (used by number inputs)
  const [minimumDraft, setMinimumDraft] = useState(() =>
    String(clampNumberToRange(Number(minPrice || min), min, max)),
  );
  const [maximumDraft, setMaximumDraft] = useState(() =>
    String(clampNumberToRange(Number(maxPrice || max), min, max)),
  );

  const commitRangeValue = (
    rawValue: string,
    currentValue: number,
    lowerBound: number,
    upperBound: number,
    setValue: (value: number) => void,
    setDraft: (value: string) => void,
    outputName: 'minPrice' | 'maxPrice',
  ) => {
    const parsedValue = parseFiniteNumberOrNull(rawValue);

    if (parsedValue === null) {
      setDraft(String(currentValue));
      return;
    }

    const committedValue = clampNumberToRange(
      parsedValue,
      lowerBound,
      upperBound,
    );

    setValue(committedValue);
    setDraft(String(committedValue));

    debounce(() => {
      onChange({
        target: {
          name: outputName,
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const commitMinimumValue = (rawValue: string) => {
    commitRangeValue(
      rawValue,
      minimumValue,
      min,
      maximumValue,
      setMinimumValue,
      setMinimumDraft,
      'minPrice',
    );
  };

  const commitMaximumValue = (rawValue: string) => {
    commitRangeValue(
      rawValue,
      maximumValue,
      minimumValue,
      max,
      setMaximumValue,
      setMaximumDraft,
      'maxPrice',
    );
  };

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;

    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const isMinimumHandle = name === 'minPrice';

    const committedValue = clampNumberToRange(
      numericValue,
      isMinimumHandle ? min : minimumValue,
      isMinimumHandle ? maximumValue : max,
    );

    if (isMinimumHandle) {
      setMinimumValue(committedValue);
      setMinimumDraft(String(committedValue));
    } else {
      setMaximumValue(committedValue);
      setMaximumDraft(String(committedValue));
    }

    debounce(() => {
      onChange({
        target: {
          name: isMinimumHandle ? 'minPrice' : 'maxPrice',
          value: String(committedValue),
        },
      } as ChangeInputType);
    });
  };

  const leftPercent = ((minimumValue - min) / (max - min)) * 100;
  const widthPercent = ((maximumValue - minimumValue) / (max - min)) * 100;

  return {
    minimumDraft,
    maximumDraft,
    leftPercent,
    widthPercent,
    commitMinimumValue,
    commitMaximumValue,
    onRangeChange: handleRangeChange,
    minimumValue,
    maximumValue,
    setMaximumDraft,
    setMinimumDraft,
  };
};

export default useRangeController;
