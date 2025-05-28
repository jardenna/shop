import { Status } from '../../app/api/apiTypes';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardFooter from '../card/CardFooter';
import CardRight from '../card/CardRight';
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
}: CategoryCardProps) => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const primaryActionBtn = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  return (
    <article className="two-col admin-card-container">
      <CategoryCardLeft
        name={subCategoryName}
        status={status}
        productsInSubcategory={productsInSubcategory}
        scheduledDate={scheduledDate}
        onReset={onReset}
      />
      <CardRight
        linkTo={`/admin/${MainPath.AdminCategories}`}
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
        linkTo={`/admin/${MainPath.AdminSubCategoryUpdate}/${categoryId}`}
        allowedToDelete={!!isAdmin}
      />
    </article>
  );
};
export default CategoryCard;
