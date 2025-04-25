import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import { PrimaryActionBtnProps } from '../modal/Modal';

type CategoryCardLeftProps = {
  id: string;
  linkTo: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate: any;
  status: CategoryStatus;
  totalProducts: number;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  totalProducts,
  name,
  linkTo,
  id,
  primaryActionBtn,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null}>
      <div className="position-relative">
        <h2 className="category-card-title">{name}</h2>
        <Badge
          badgeText={language[status.toLocaleLowerCase()]}
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
