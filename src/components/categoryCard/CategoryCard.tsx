import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import './_category-card.scss';
import CategoryCardLeft from './CategoryCardLeft';
import CategoryCardRight from './CategoryCardRight';

type CategoryCardProps = {
  categoryId: string;
  createdAt: Date;
  mainCategoryName: string;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: CategoryStatus;
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
      <CategoryCardLeft
        name={subCategoryName}
        primaryActionBtn={primaryActionBtn}
        id={categoryId}
        linkTo={`/admin/${MainPath.AdminSubCategoryUpdate}/${categoryId}`}
        status={status}
        totalProducts={totalProducts}
        scheduledDate={scheduledDate}
      />
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
