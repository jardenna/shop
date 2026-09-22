import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import { translateKey } from '../../utils/utils';
import CartFooter from './CartFooter';

import CartRight from './CartRight';
import CategoryCartLeft from './CategoryCartLeft';

interface CategoryCartProps {
  categoryId: string;
  categoryName: string;
  isDeleteLoading: boolean;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: Status;
  statusMessage: string;
  subCategoryName: string;
  onDeleteSubCategory: () => void;
}

const CategoryCart = ({
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
}: CategoryCartProps) => {
  const { language } = useLanguage();

  return (
    <section className="two-col admin-cart-container">
      <CategoryCartLeft
        name={subCategoryName}
        status={status}
        productsInSubcategory={productsInSubcategory}
        scheduledDate={scheduledDate}
      />
      <CartRight
        linkTo={AdminPath.AdminCategories}
        heading={`${language.categoryName}: ${translateKey(categoryName, language)}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={`${language.parentCategoryIs} ${translateKey(statusMessage, language)}`}
      />
      <CartFooter
        isLoading={isDeleteLoading}
        id={categoryId}
        name={subCategoryName}
        modalHeaderText={language.deleteCategory}
        linkTo={`${AdminPath.AdminSubCategoryUpdate}/${categoryId}`}
        onDelete={onDeleteSubCategory}
      />
    </section>
  );
};

export default CategoryCart;
