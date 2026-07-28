import './_progress-bar.scss';

type ProgressBarProps = {
  progressPercentage: number;
  isAuto?: boolean;
};

const ProgressBar = ({ progressPercentage, isAuto }: ProgressBarProps) => (
  <span
    className="progress-bar-container"
    role="progressbar"
    aria-label="progressbar"
  >
    <span
      style={{ width: `${progressPercentage}%` }}
      className={`progress-bar  ${isAuto ? 'auto-animation' : ''}`}
      aria-valuetext={progressPercentage.toString()}
      aria-valuenow={progressPercentage}
    />
  </span>
);

export default ProgressBar;
