import { Status } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import Tooltip from '../tooltip/Tooltip';
import './_badge.scss';

type BadgeProps = {
  scheduledDate: Date | null;
  status: Status;
};

const Badge = ({ scheduledDate, status }: BadgeProps) => {
  const { language } = useLanguage();

  return (
    <div className="badge-container">
      <span className={`badge ${status.toLowerCase()}`}>
        <span>{getlowerCaseFirstLetter(status, language)}</span>
      </span>
      {scheduledDate && (
        <div>
          <Tooltip
            ariaControls="scheduled-date"
            ariaLabel={language.viewScheduledDate}
            triggerBtnVariant={BtnVariant.Ghost}
            tooltip={
              <DateDisplay
                date={scheduledDate}
                hour="2-digit"
                minute="2-digit"
              />
            }
          >
            <Icon iconName={IconName.Calendar} title={language.calendar} />
          </Tooltip>
        </div>
      )}
    </div>
  );
};

export default Badge;
