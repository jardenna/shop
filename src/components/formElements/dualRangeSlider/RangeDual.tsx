import { ChangeInputType } from '../../../types/types';
import RangeSliderInput from './RangeSliderInput';
import {
  InputUtils,
  RangeCommittedValues,
  RangeTrackMetrics,
} from './useRangeController';

type RangeDualProps = {
  committed: RangeCommittedValues;
  inputNames: InputUtils;
  max: number;
  min: number;
  step: number;
  track: RangeTrackMetrics;
  unitLabel: string;
  onRangeChange: (event: ChangeInputType) => void;
};

const RangeDual = ({
  track,
  unitLabel,
  onRangeChange,
  committed,
  inputNames,
  step,
  min,
  max,
}: RangeDualProps) => (
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
      onChange={onRangeChange}
      name={inputNames.min}
      id="min"
      step={step}
    />

    <RangeSliderInput
      min={min}
      max={max}
      value={committed.max}
      onChange={onRangeChange}
      name={inputNames.max}
      id="max"
      step={step}
    />
  </div>
);

export default RangeDual;
