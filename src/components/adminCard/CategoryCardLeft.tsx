import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardContent from '../card/CardContent';
import ScheduledDateBadge from '../card/ScheduledDateBadge';

type CategoryCardLeftProps = {
  name: string;
  scheduledDate: Date | null;
  status: Status;
  totalProducts: number;
  onReset: () => void;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  totalProducts,
  name,
  onReset,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null} onReset={onReset}>
      <div className="admin-card-heading">
        <h2 className="admin-card-title">{name}</h2>
        <ScheduledDateBadge
          badgeClassName={status.toLowerCase()}
          badgeText={getlowerCaseFirstLetter(status, language)}
          scheduledDate={scheduledDate || null}
        />
      </div>
      <span>
        {language.totalProducts}: {totalProducts}
      </span>
    </CardContent>
  );
};

export default CategoryCardLeft;
