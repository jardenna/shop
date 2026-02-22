import { useId } from 'react';
import { ChangeInputType } from '../../../types/types';
import VisuallyHidden from '../../VisuallyHidden';
import RangeSliderInput from './RangeSliderInput';
import { InputUtils } from './useRangeController';

interface DualRangeSliderProps {
  committed: {
    max: number;
    min: number;
  };
  inputLabels: InputUtils;
  inputNames: InputUtils;
  max: number;
  min: number;
  step: number;
  track: {
    startPercent: number;
    widthPercent: number;
  };
  unitLabel: string;
  onChange: (event: ChangeInputType) => void;
}

const DualRangeSlider = ({
  track,
  unitLabel,
  onChange,
  committed,
  inputNames,
  inputLabels,
  min,
  max,
  step,
}: DualRangeSliderProps) => {
  const minOutputId = useId();
  const maxOutputId = useId();
  const minRangeId = useId();
  const maxRangeId = useId();

  return (
    <div className="dual-range">
      <output
        id={minOutputId}
        className="range-label range-label-min"
        style={{ left: `${track.startPercent}%` }}
      >
        {committed.min} {unitLabel}
      </output>

      <output
        id={maxOutputId}
        className="range-label range-label-max"
        style={{
          left: `${track.startPercent + track.widthPercent}%`,
        }}
      >
        {committed.max} {unitLabel}
      </output>

      <div className="slider-track" aria-hidden="true" />

      <div
        className="slider-track-filled"
        style={{
          left: `${track.startPercent}%`,
          width: `${track.widthPercent}%`,
        }}
        aria-hidden="true"
      />

      <VisuallyHidden as="label" htmlFor={minRangeId}>
        {inputLabels.min}
      </VisuallyHidden>

      <RangeSliderInput
        id={minRangeId}
        name={inputNames.min}
        min={min}
        max={max}
        step={step}
        value={committed.min}
        onChange={onChange}
        aria-describedby={minOutputId}
      />

      <VisuallyHidden as="label" htmlFor={maxRangeId}>
        {inputLabels.max}
      </VisuallyHidden>

      <RangeSliderInput
        id={maxRangeId}
        name={inputNames.max}
        min={min}
        max={max}
        step={step}
        value={committed.max}
        onChange={onChange}
        aria-describedby={maxOutputId}
      />
    </div>
  );
};
export default DualRangeSlider;
