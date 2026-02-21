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

  const [minCommittedValue, setMinCommittedValue] = useState(() =>
    clampNumberToRange(Number(minPrice || min), min, max),
  );
  const [maxCommittedValue, setMaxCommittedValue] = useState(() =>
    clampNumberToRange(Number(maxPrice || max), min, max),
  );

  const [minInputValue, setMinInputValue] = useState(() =>
    String(clampNumberToRange(Number(minPrice || min), min, max)),
  );
  const [maxInputValue, setMaxInputValue] = useState(() =>
    String(clampNumberToRange(Number(maxPrice || max), min, max)),
  );

  const commitInputValue = (
    inputValue: string,
    currentCommittedValue: number,
    minAllowedValue: number,
    maxAllowedValue: number,
    setCommittedValue: (value: number) => void,
    setInputValue: (value: string) => void,
    outputName: 'minPrice' | 'maxPrice',
  ) => {
    const parsedValue = parseFiniteNumberOrNull(inputValue);

    if (parsedValue === null) {
      setInputValue(String(currentCommittedValue));
      return;
    }

    const nextCommittedValue = clampNumberToRange(
      parsedValue,
      minAllowedValue,
      maxAllowedValue,
    );

    setCommittedValue(nextCommittedValue);
    setInputValue(String(nextCommittedValue));

    debounce(() => {
      onChange({
        target: {
          name: outputName,
          value: String(nextCommittedValue),
        },
      } as ChangeInputType);
    });
  };

  const commitMinInputValue = (inputValue: string) => {
    commitInputValue(
      inputValue,
      minCommittedValue,
      min,
      maxCommittedValue,
      setMinCommittedValue,
      setMinInputValue,
      'minPrice',
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
      'maxPrice',
    );
  };

  const handleRangeChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    const numericValue = Number(value);

    if (!Number.isFinite(numericValue)) {
      return;
    }

    const isMinHandle = name === 'minPrice';

    const nextCommittedValue = clampNumberToRange(
      numericValue,
      isMinHandle ? min : minCommittedValue,
      isMinHandle ? maxCommittedValue : max,
    );

    if (isMinHandle) {
      setMinCommittedValue(nextCommittedValue);
      setMinInputValue(String(nextCommittedValue));
    } else {
      setMaxCommittedValue(nextCommittedValue);
      setMaxInputValue(String(nextCommittedValue));
    }

    debounce(() => {
      onChange({
        target: {
          name: isMinHandle ? 'minPrice' : 'maxPrice',
          value: String(nextCommittedValue),
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
