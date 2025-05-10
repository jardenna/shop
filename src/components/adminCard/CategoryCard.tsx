import { ErrorBoundary } from 'react-error-boundary';
import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import CardRight from '../card/CardRight';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import CategoryCardLeft from './CategoryCardLeft';

type CategoryCardProps = {
  categoryId: string;
  createdAt: Date;
  mainCategoryName: string;
  scheduledDate: Date | null;
  showStatusMessage: boolean;
  status: Status;
  statusMessage: string;
  subCategoryName: string;
  totalProducts: number;
  onDeleteSubCategory: () => void;
  onReset: () => void;
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
  onReset,
}: CategoryCardProps) => {
  const { language } = useLanguage();
  const primaryActionBtn = {
    onClick: onDeleteSubCategory,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  return (
    <article className="admin-card-container">
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={onReset}
      >
        <CategoryCardLeft
          name={subCategoryName}
          primaryActionBtn={primaryActionBtn}
          id={categoryId}
          linkTo={`/admin/${MainPath.AdminSubCategoryUpdate}/${categoryId}`}
          status={status}
          totalProducts={totalProducts}
          scheduledDate={scheduledDate}
        />
      </ErrorBoundary>

      <CardRight
        linkTo={`/admin/${MainPath.AdminCategories}`}
        createdAt={createdAt}
        heading={`${language.parentCategory}: ${mainCategoryName}`}
        name={subCategoryName}
        showStatusMessage={showStatusMessage}
        statusMessage={`${language.parentCategoryIs} ${language[statusMessage]}`}
        onReset={onReset}
      />
    </article>
  );
};
export default CategoryCard;
