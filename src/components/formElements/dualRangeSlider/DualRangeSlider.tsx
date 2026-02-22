import { ChangeInputType } from '../../../types/types';
import VisuallyHidden from '../../VisuallyHidden';
import RangeSliderInput from './RangeSliderInput';
import {
  InputUtils,
  RangeCommittedValues,
  RangeTrackMetrics,
} from './useRangeController';

export interface BaseDualRangeProps {
  inputNames: InputUtils;
  max: number;
  min: number;
  step: number;
  onChange: (event: ChangeInputType) => void;
}

interface DualRangeSliderProps extends BaseDualRangeProps {
  committed: RangeCommittedValues;
  inputLabels: InputUtils;
  track: RangeTrackMetrics;
  unitLabel: string;
  rangeLabelId?: string;
  standAlone?: boolean;
}

const DualRangeSlider = ({
  track,
  unitLabel,
  onChange,
  committed,
  inputNames,
  step,
  min,
  max,
  inputLabels,
  standAlone = true,
  rangeLabelId = 'range-label',
}: DualRangeSliderProps) => (
  <div
    className="dual-range"
    {...(standAlone && {
      role: 'group',
      'aria-labelledby': rangeLabelId,
    })}
  >
    {standAlone && (
      <VisuallyHidden id={rangeLabelId}>Range selection</VisuallyHidden>
    )}

    <output
      id="min-output"
      className="range-label range-label-min"
      style={{ left: `${track.startPercent}%` }}
      aria-live="polite"
    >
      {committed.min} {unitLabel}
    </output>

    <output
      id="max-output"
      className="range-label range-label-max"
      style={{
        left: `${track.startPercent + track.widthPercent}%`,
      }}
      aria-live="polite"
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

    <VisuallyHidden as="label" htmlFor="min-range">
      {inputLabels.min}
    </VisuallyHidden>

    <RangeSliderInput
      id="min-range"
      name={inputNames.min}
      min={min}
      max={max}
      step={step}
      value={committed.min}
      onChange={onChange}
      aria-describedby="min-output"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={committed.min}
    />

    <VisuallyHidden as="label" htmlFor="max-range">
      {inputLabels.max}
    </VisuallyHidden>
    <RangeSliderInput
      id="max-range"
      name={inputNames.max}
      min={min}
      max={max}
      step={step}
      value={committed.max}
      onChange={onChange}
      aria-describedby="max-output"
      aria-valuemin={min}
      aria-valuemax={max}
      aria-valuenow={committed.max}
    />
  </div>
);

export default DualRangeSlider;
