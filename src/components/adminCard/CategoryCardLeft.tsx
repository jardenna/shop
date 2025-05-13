import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Badge from '../badge/Badge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import AdminCard from './types';

type CategoryCardLeftProps = AdminCard & {
  status: Status;
  totalProducts: number;
  onReset: () => void;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  totalProducts,
  name,
  linkTo,
  id,
  primaryActionBtn,
  onReset,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null} onReset={onReset}>
      <div className="position-relative">
        <h2 className="admin-card-title">{name}</h2>
        <Badge
          badgeText={getlowerCaseFirstLetter(status, language)}
          className={status.toLowerCase()}
        />
        <span>
          {language.totalProducts}: {totalProducts}
        </span>
      </div>
      <CardFooter
        id={id}
        primaryActionBtn={primaryActionBtn}
        name={name}
        modalHeaderText={language.deleteCategory}
        linkTo={linkTo}
        scheduledDate={scheduledDate}
      />
    </CardContent>
  );
};

export default CategoryCardLeft;
