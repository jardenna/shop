import { Fragment } from 'react/jsx-runtime';
import type { DeliveryStatus } from '../../app/api/apiTypes/orderApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { orderTrackingList } from '../../features/orders/utils/createTrackingList';
import Icon from '../icons/Icon';
import './_progress-tracker.scss';
import type { IconNameValue } from '../../types/types';

interface TrackingList {
  iconName: IconNameValue;
  id: string;
  label: string;
}

interface ProgressTrackerProps {
  status: DeliveryStatus;
  steps: TrackingList[];
}

const getStepClassName = (index: number, currentStatusIndex: number) => {
  if (index < currentStatusIndex) {
    return 'completed';
  }

  if (index === currentStatusIndex) {
    return 'in-progress';
  }

  return '';
};

const ProgressTracker = ({ steps, status }: ProgressTrackerProps) => {
  const { language } = useLanguage();

  const currentStatusIndex = orderTrackingList.findIndex(
    ({ id }) => id === status,
  );

  return (
    <ul className="progress-tracker">
      {steps.map(({ id, label, iconName }, index) => (
        <Fragment key={id}>
          <li className="tracker-step">
            <span
              className={`tracker-step-circle ${getStepClassName(
                index,
                currentStatusIndex,
              )}`}
            >
              <Icon iconName={iconName} aria-hidden />
            </span>
            <span>{language[label]}</span>
          </li>
          <li className="tracker-step-line" />
        </Fragment>
      ))}
    </ul>
  );
};

export default ProgressTracker;
