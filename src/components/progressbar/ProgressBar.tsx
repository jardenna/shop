import './_progress-bar.scss';

type ProgressBarProps = {
  progressPercentage: number;
  isAuto?: boolean;
  variant?: 'danger' | 'success';
};

const ProgressBar = ({
  progressPercentage,
  isAuto,
  variant,
}: ProgressBarProps) => (
  <span
    className="progress-bar-container"
    role="progressbar"
    aria-label="progressbar"
  >
    <span
      style={{ width: `${progressPercentage}%` }}
      className={`progress-bar  ${isAuto ? 'auto-animation' : ''} ${variant ?? ''}`}
      aria-valuetext={progressPercentage.toString()}
      aria-valuenow={progressPercentage}
    />
  </span>
);

export default ProgressBar;
