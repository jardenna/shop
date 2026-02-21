import { Status } from '../../../app/api/apiTypes/adminApiTypes';
import Badge from '../../../components/badge/Badge';
import DateDisplay from '../../../components/datePicker/DateDisplay';
import Icon from '../../../components/icons/Icon';
import Popup from '../../../components/popup/Popup';
import { IconName } from '../../../types/enums';
import { translateKey } from '../../../utils/utils';
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
        badgeText={translateKey(status, language)}
        className={status.toLowerCase()}
      />
      {scheduledDate && (
        <Popup
          ariaControls="scheduled-date"
          ariaHasPopup="dialog"
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
