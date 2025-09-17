import { Status } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Badge from '../Badge';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import Tooltip from '../tooltip/Tooltip';

type AdminBadgeProps = {
  scheduledDate: Date | null;
  status: Status;
};

const AdminBadge = ({ scheduledDate, status }: AdminBadgeProps) => {
  const { language } = useLanguage();

  return (
    <div className="badge-container">
      <Badge
        badgeText={getlowerCaseFirstLetter(status, language)}
        className={status.toLowerCase()}
      />
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

export default AdminBadge;
