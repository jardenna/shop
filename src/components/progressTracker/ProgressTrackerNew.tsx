import { Fragment } from 'react/jsx-runtime';
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

interface ProgressTrackerNewProps {
  status: Status;
  steps: TrackingList[];
}

const ProgressTrackerNew = ({ steps, status }: ProgressTrackerNewProps) => {
  const { language } = useLanguage();

  const currentStatusIndex = orderTrackingList.findIndex(
    ({ id }) => id === status.status,
  );
  return (
    <ul className="progress-tracker">
      {steps.map(({ id, label, iconName }, index) => (
        <Fragment key={id}>
          <li className="step">
            <span
              className={`step-circle ${index <= currentStatusIndex ? 'completed' : ''} ${index === currentStatusIndex ? 'in-procsss' : ''}`}
            >
              <Icon iconName={iconName} aria-hidden />
            </span>
            <span className="step-label">{language[label]}</span>
          </li>
          <li className="step-line" />
        </Fragment>
      ))}
    </ul>
  );
};

export default ProgressTrackerNew;
