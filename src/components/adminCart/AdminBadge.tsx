import { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { translateKey } from '../../utils/utils';
import Badge from '../badge/Badge';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import Popup from '../popup/Popup';

type AdminBadgeProps = {
  scheduledDate: Date | null;
  status: Status;
};

const AdminBadge = ({ scheduledDate, status }: AdminBadgeProps) => {
  const { language } = useLanguage();

  return (
    <div className="admin-badge-container">
      <Badge
        badgeText={translateKey(status, language)}
        className={status.toLowerCase()}
      />
      {scheduledDate && (
        <Popup
          ariaLabel={language.viewScheduledDate}
          popupContent={
            <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
          }
        >
          <Icon iconName={IconName.Calendar} />
        </Popup>
      )}
    </div>
  );
};

export default AdminBadge;
