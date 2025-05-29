import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import DateDisplay from '../datePicker/DateDisplay';
import Icon from '../icons/Icon';
import Tooltip from '../tooltip/Tooltip';
import VisuallyHidden from '../VisuallyHidden';
import './_badge.scss';

type BadgeProps = {
  badgeClassName: string;
  badgeText: string;
  scheduledDate: Date | null;
};

const Badge = ({ badgeText, badgeClassName, scheduledDate }: BadgeProps) => {
  const { language } = useLanguage();

  return (
    <div className="badge-container">
      <span className={`badge ${badgeClassName}`}>
        <span>{badgeText}</span>
      </span>
      {scheduledDate && (
        <>
          <VisuallyHidden>
            <DateDisplay date={scheduledDate} hour="2-digit" minute="2-digit" />
          </VisuallyHidden>
          <div aria-hidden={true}>
            <Tooltip
              ariaControls="scheduled-date"
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
        </>
      )}
    </div>
  );
};

export default Badge;
