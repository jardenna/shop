import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { translateKey } from '../../utils/utils';
import CardFooter from '../cart/CartFooter';
import CardRight from '../cart/CartRight';
import type { PrimaryActionBtnProps } from '../modal/Modal';
import CategoryCartLeft from './CategoryCartLeft';

type CategoryCartProps = {
  categoryId: string;
  categoryName: string;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: Status;
  statusMessage: string;
  subCategoryName: string;
  triggerModalDisabled?: boolean;
  onDeleteSubCategory: () => void;
  onReset: () => void;
};

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
  onReset,
  triggerModalDisabled,
}: CategoryCartProps) => {
  const { language } = useLanguage();

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  return (
    <section className="two-col admin-card-container">
      <CategoryCartLeft
        name={subCategoryName}
        status={status}
        productsInSubcategory={productsInSubcategory}
        scheduledDate={scheduledDate}
        onReset={onReset}
      />
      <CardRight
        linkTo={AdminPath.AdminCategories}
        heading={`${language.categoryName}: ${translateKey(categoryName, language)}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={`${language.parentCategoryIs} ${translateKey(statusMessage, language)}`}
        onReset={onReset}
      />
      <CardFooter
        id={categoryId}
        primaryActionBtn={primaryActionBtn}
        name={subCategoryName}
        modalHeaderText={language.deleteCategory}
        linkTo={`${AdminPath.AdminSubCategoryUpdate}/${categoryId}`}
        triggerModalDisabled={triggerModalDisabled}
      />
    </section>
  );
};

export default CategoryCart;
