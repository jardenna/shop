import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/navConstants';
import { translateKey } from '../../utils/utils';
import CardFooter from './CardFooter';

import CardRight from './CardRight';
import CategoryCardLeft from './CategoryCardLeft';

interface CategoryCardProps {
  categoryId: string;
  categoryName: string;
  isAdmin: boolean;
  isDeleteLoading: boolean;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: Status;
  statusMessage: string;
  subCategoryName: string;
  onDeleteSubCategory: () => void;
}

const CategoryCard = ({
  subCategoryName,
  productsInSubcategory,
  categoryName,
  showStatusMessage,
  scheduledDate,
  statusMessage,
  status,
  categoryId,
  onDeleteSubCategory,
  isDeleteLoading,
  isAdmin,
}: CategoryCardProps) => {
  const { language } = useLanguage();

  return (
    <section className="two-col admin-cart-container">
      <CategoryCardLeft
        name={subCategoryName}
        status={status}
        productsInSubcategory={productsInSubcategory}
        scheduledDate={scheduledDate}
      />
      <CardRight
        linkTo={AdminPath.AdminCategories}
        heading={`${language.categoryName}: ${translateKey(categoryName, language)}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={`${language.parentCategoryIs} ${translateKey(statusMessage, language)}`}
      />
      <CardFooter
        isLoading={isDeleteLoading}
        id={categoryId}
        name={subCategoryName}
        modalHeaderText={language.deleteCategory}
        linkTo={`${AdminPath.AdminSubCategoryUpdate}/${categoryId}`}
        onDelete={onDeleteSubCategory}
        hideDeleteBtn={!isAdmin}
      />
    </section>
  );
};

export default CategoryCard;
