import Badge from '../../components/badge/Badge';
import DateDisplay from '../../components/datePicker/DateDisplay';
import Icon from '../../components/icons/Icon';
import Tooltip from '../../components/tooltip/Tooltip';
import { BtnVariant, IconName } from '../../types/enums';
import useLanguage from '../language/useLanguage';

type CategoryBadgeProps = {
  badgeClassName: string;
  badgeText: string;
  scheduledDate: Date | null;
};

const CategoryBadge = ({
  badgeText,
  badgeClassName,
  scheduledDate,
}: CategoryBadgeProps) => {
  const { language } = useLanguage();
  return (
    <div className="flex">
      <Badge badgeText={badgeText} className={badgeClassName} />
      {scheduledDate && (
        <Tooltip
          text={
            <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
          }
          ariaControls="scheduled-date"
          triggerBtnVariant={BtnVariant.Ghost}
          ariaLabel={language.scheduledDate}
        >
          <Icon
            iconName={IconName.Calendar}
            title={language.calendar}
            ariaLabel={language.scheduledDate}
          />
        </Tooltip>
      )}
    </div>
  );
};

export default CategoryBadge;
