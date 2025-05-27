import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import Badge from '../badge/Badge';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import Tooltip from '../tooltip/Tooltip';

type ScheduledDateBadgeProps = {
  badgeClassName: string;
  badgeText: string;
  scheduledDate: Date | null;
};

const ScheduledDateBadge = ({
  badgeText,
  badgeClassName,
  scheduledDate,
}: ScheduledDateBadgeProps) => {
  const { language } = useLanguage();

  return (
    <div className="flex align-items-center">
      <Badge badgeText={badgeText} className={badgeClassName} />
      {scheduledDate && (
        <Tooltip
          ariaControls="scheduled-date"
          triggerBtnVariant={BtnVariant.Ghost}
          ariaLabel={language.scheduledDate}
          tooltip={
            <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
          }
        >
          <Icon
            iconName={IconName.Calendar}
            title={language.calendar}
            ariaLabel={language.scheduledDate}
            ariaHidden
          />
        </Tooltip>
      )}
    </div>
  );
};

export default ScheduledDateBadge;
