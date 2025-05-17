import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import Tooltip from '../tip/Tooltip';

type CardBadgeProps = {
  badgeClassName: string;
  badgeText: string;
  scheduledDate: Date | null;
};

const CardBadge = ({
  badgeText,
  badgeClassName,
  scheduledDate,
}: CardBadgeProps) => {
  const { language } = useLanguage();
  console.log(language.add);

  return (
    <div className="flex align-items-center ">
      <Badge badgeText={badgeText} className={badgeClassName} />
      {scheduledDate && <Tooltip />}
    </div>
  );
};

export default CardBadge;
