import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardFooter from '../card/CardFooter';
import CardRight from '../card/CardRight';
import type { PrimaryActionBtnProps } from '../modal/Modal';
import CategoryCardLeft from './CategoryCardLeft';

type CategoryCardProps = {
  categoryId: string;
  mainCategoryName: string;
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

const CategoryCard = ({
  subCategoryName,
  productsInSubcategory,
  mainCategoryName,
  showStatusMessage,
  scheduledDate,
  statusMessage,
  status,
  categoryId,
  onDeleteSubCategory,
  onReset,
  triggerModalDisabled,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  return (
    <section className="two-col admin-card-container">
      <CategoryCardLeft
        name={subCategoryName}
        status={status}
        productsInSubcategory={productsInSubcategory}
        scheduledDate={scheduledDate}
        onReset={onReset}
      />
      <CardRight
        linkTo={AdminPath.AdminCategories}
        heading={`${language.mainCategoryName}: ${mainCategoryName}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={`${language.parentCategoryIs} ${getlowerCaseFirstLetter(statusMessage, language)}`}
        onReset={onReset}
      />
      <CardFooter
        id={categoryId}
        primaryActionBtn={primaryActionBtn}
        name={subCategoryName}
        modalHeaderText={language.deleteCategory}
        linkTo={`${AdminPath.AdminSubCategoryUpdate}/${categoryId}`}
        allowedToDelete={!!isAdmin}
        triggerModalDisabled={triggerModalDisabled}
      />
    </section>
  );
};
export default CategoryCard;
