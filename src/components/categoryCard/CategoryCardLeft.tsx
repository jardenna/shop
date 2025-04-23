import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import { PrimaryActionBtnProps } from '../modal/Modal';
import CategoryCardContent from './CategoryCardContent';
import CategoryCardFooter from './CategoryCardFooter';
import CategoryDate from './CategoryDate';

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
    <CategoryCardContent className="left" heading={null}>
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
      <>
        {scheduledDate && (
          <CategoryDate
            name={name}
            text={language.scheduledToBePubliched}
            date={scheduledDate}
          />
        )}
        <CategoryCardFooter
          id={id}
          primaryActionBtn={primaryActionBtn}
          name={name}
          modalHeaderText={language.deleteCategory}
          linkTo={linkTo}
        />
      </>
    </CategoryCardContent>
  );
};

export default CategoryCardLeft;
