import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';
import CategoryCart from '../../components/adminCart/CategoryCart';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import SkeletonTwoCarts from '../../components/skeleton/adminViewItemSkeletons/SkeletonTwoCarts';
import { useToast } from '../../components/toast/hooks/useToast';
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

  const { onAddToast } = useToast();

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

  const [deleteSubCategory, { isLoading: isDeleteLoading }] =
    useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = async () => {
    const result = await deleteSubCategory(id || '').unwrap();

    if (result.success) {
      navigate(AdminPath.AdminSubCategories);
      onAddToast({
        message: language.categoryDeleted,
      });
    } else {
      onAddToast({
        type: 'error',
        message: language.categoryNotFound,
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
            isDeleteLoading={isDeleteLoading}
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
