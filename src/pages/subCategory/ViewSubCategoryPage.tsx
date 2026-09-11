import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';
import CategoryCart from '../../components/adminCart/CategoryCart';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import NotFoundError from '../../components/NotFoundError';
import SkeletonTwoCarts from '../../components/skeleton/adminViewItemSkeletons/SkeletonTwoCarts';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const ViewSubCategoryPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: category,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetSubCategoryByIdQuery(id || '', {
    refetchOnMountOrArgChange: true,
  });

  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    const result = await deleteSubCategory(id || '').unwrap();

    if (result.success) {
      navigate(AdminPath.AdminSubCategories);
      onAddMessagePopup({
        message: language.categoryDeleted,
        withDelay: true,
      });
    } else {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: language.categoryNotFound,
        componentType: 'notification',
      });
    }
  };

  const subCategoryName = category ? language[category.translationKey] : '';

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="subCategories"
        path={AdminPath.AdminSubCategories}
      />
    );
  }

  if (isLoading) {
    return <SkeletonTwoCarts />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch}
    >
      {category && (
        <AdminPageContainer
          heading={`${language.category} ${subCategoryName || category.subCategoryName}`}
          linkText={language.createNewCategory}
          linkTo={AdminPath.AdminSubCategoryCreate}
          variant="medium"
        >
          <CategoryCart
            isLoading={isLoading}
            onDeleteSubCategory={handleDeleteSubCategory}
            categoryId={category.id}
            subCategoryName={subCategoryName || category.subCategoryName}
            productsInSubcategory={category.productCount}
            categoryName={category.mainCategory.categoryName}
            showStatusMessage={
              category.mainCategory.categoryStatus !== 'Published'
            }
            scheduledDate={category.scheduledDate || null}
            statusMessage={translateKey(
              category.mainCategory.categoryStatus,
              language,
            )}
            status={category.categoryStatus}
          />
        </AdminPageContainer>
      )}
    </ErrorBoundary>
  );
};

export default ViewSubCategoryPage;
