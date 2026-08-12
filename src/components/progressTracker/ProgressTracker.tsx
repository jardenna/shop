import { useLanguage } from '../../features/language/useLanguage';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import './_progress-tracker.scss';

interface Status {
  status: string;
}

interface TrackingList {
  iconName: IconName;
  id: string;
  label: string;
}

interface StatusTrackerProps {
  status: Status;
  steps: TrackingList[];
}

const StatusTracker = ({ steps, status }: StatusTrackerProps) => {
  const { language } = useLanguage();

  const currentStatusIndex = orderTrackingList.findIndex(
    ({ id }) => id === status.status,
  );

  return (
    <ul className="tracking-list">
      {steps.map(({ id, label, iconName }, index) => (
        <li key={id} className="tracking-list-item">
          <span
            className={`tracking-list-icon ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'in-procsss' : ''}`}
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
