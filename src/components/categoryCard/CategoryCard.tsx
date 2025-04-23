import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import Badge from '../badge/Badge';
import LinkButton from '../LinkButton';
import './_category-card.scss';
import CategoryCardContent from './CategoryCardContent';
import CategoryCardFooter from './CategoryCardFooter';
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

        <div>
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
        </div>
      </CategoryCardContent>

      <CategoryCardContent
        className="right"
        heading={`${language.parentCategory}: ${mainCategoryName}`}
      >
        {showStatusMessage && (
          <div>
            <div className="category-card-text">
              <h3>
                {language.parentCategoryIs} {language[statusMessage]}
              </h3>
              {subCategoryName} {language.notVisibleInShop}.
            </div>
            <div>
              <LinkButton
                linkTo={`/admin/${MainPath.AdminCategories}`}
                linkText={language.publish}
              />
            </div>
          </div>
        )}
        <CategoryDate text={language.createdAt} date={createdAt} />
      </CategoryCardContent>
    </article>
  );
};
export default CategoryCard;
