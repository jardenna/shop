import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import './_progress-bar.scss';

interface ProgressBarProps {
  progressPercentage: number;
  isAuto?: boolean;
}

const ProgressBar: FC<ProgressBarProps> = ({ progressPercentage, isAuto }) => {
  const { language } = useLanguage();
  return (
    <span
      className="progress-bar-container"
      role="progressbar"
      aria-label={language.progressbar}
    >
      <span
        style={{ width: `${progressPercentage}%` }}
        className={`progress-bar  ${isAuto ? 'auto-animation' : ''}`}
        aria-valuetext={`${language.progress} ${progressPercentage}% ${language.completed}`}
      />
    </span>
  );
};

export default ProgressBar;
