import { ChangeInputType } from '../../../types/types';
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
  inputNames: InputUtils;
  track: RangeTrackMetrics;
  unitLabel: string;
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
}: DualRangeSliderProps) => (
  <div className="dual-range">
    <output
      className="range-label range-label-min"
      style={{ left: `${track.startPercent}%` }}
    >
      {committed.min} {unitLabel}
    </output>

    <output
      className="range-label range-label-max"
      style={{
        left: `${track.startPercent + track.widthPercent}%`,
      }}
    >
      {committed.max} {unitLabel}
    </output>

    <div className="slider-track" />

    <div
      className="slider-track-filled"
      style={{
        left: `${track.startPercent}%`,
        width: `${track.widthPercent}%`,
      }}
    />

    <RangeSliderInput
      min={min}
      max={max}
      value={committed.min}
      onChange={onChange}
      name={inputNames.min}
      id="min"
      step={step}
    />

    <RangeSliderInput
      min={min}
      max={max}
      value={committed.max}
      onChange={onChange}
      name={inputNames.max}
      id="max"
      step={step}
    />
  </div>
);

export default DualRangeSlider;
