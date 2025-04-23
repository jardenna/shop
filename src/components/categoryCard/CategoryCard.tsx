import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import Badge from '../badge/Badge';
import './_category-card.scss';
import CategoryCardContent from './CategoryCardContent';
import CategoryCardFooter from './CategoryCardFooter';
import CategoryCardRight from './CategoryCardRight';
import CategoryDate from './CategoryDate';

type CategoryCardProps = {
  categoryId: string;
  createdAt: Date;
  mainCategoryName: string;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: string;
  statusMessage: string;
  subCategoryName: string;
  totalProducts: number;
  onDeleteSubCategory: () => void;
};

const CategoryCard = ({
  subCategoryName,
  totalProducts,
  createdAt,
  mainCategoryName,
  showStatusMessage,
  scheduledDate,
  statusMessage,
  status,
  categoryId,
  onDeleteSubCategory,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  const primaryActionBtn = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  return (
    <article className="category-card-container">
      <CategoryCardContent className="left" heading={null}>
        <div className="position-relative">
          <h2 className="category-card-title">{subCategoryName}</h2>
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
              name={subCategoryName}
              text={language.scheduledToBePubliched}
              date={scheduledDate}
            />
          )}
          <CategoryCardFooter
            id={categoryId}
            primaryActionBtn={primaryActionBtn}
            name={subCategoryName}
            modalHeaderText={language.deleteCategory}
            linkTo={`/admin/${MainPath.AdminSubCategoryUpdate}/${categoryId}`}
          />
        </>
      </CategoryCardContent>
      <CategoryCardRight
        linkTo={`/admin/${MainPath.AdminCategories}`}
        createdAt={createdAt}
        heading={`${language.parentCategory}: ${mainCategoryName}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={statusMessage}
      />
    </article>
  );
};
export default CategoryCard;
