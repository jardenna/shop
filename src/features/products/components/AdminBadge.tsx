import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import Badge from '../../../components/Badge';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import Icon from '../../../components/icons/Icon';
import Tooltip from '../../../components/tooltip/Tooltip';
import { BtnVariant, IconName } from '../../../types/enums';
import { getlowerCaseFirstLetter } from '../../../utils/utils';
import useLanguage from '../../language/useLanguage';

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
        <Tooltip
          ariaControls="scheduled-date"
          ariaLabel={language.viewScheduledDate}
          triggerBtnVariant={BtnVariant.Ghost}
          tooltip={
            <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
          }
        >
          <Icon iconName={IconName.Calendar} title={language.calendar} />
        </Tooltip>
      )}
    </div>
  );
};

export default AdminBadge;
