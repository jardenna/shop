import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_status-tracker.scss';

interface TrackingList {
  iconName: IconName;
  id: string;
  label: string;
}

interface StatusTrackerProps {
  status: number;
  steps: TrackingList[];
}

const StatusTracker = ({ steps, status }: StatusTrackerProps) => {
  const { language } = useLanguage();

  return (
    <ul className="tracking-list">
      {steps.map(({ id, label, iconName }, index) => (
        <li key={id} className="tracking-list-item">
          <span
            className={`tracking-list-icon ${index <= status ? 'completed' : ''}`}
          >
            <Icon iconName={iconName} aria-hidden />
          </span>
          <p className="tracking-list-label">{language[label]}</p>
        </li>
      ))}
    </ul>
  );
};

export default StatusTracker;
