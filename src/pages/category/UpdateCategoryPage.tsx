import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateCategoryPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: { category } = {},
    isLoading,
    refetch,
    isError,
    error,
  } = useGetCategoryByIdQuery(id || '');

  if (isError) {
    return (
      <ErrorBoundaryFallback
        error={error}
        btnLabel={language.viewMyOrders}
        resetErrorBoundary={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <>
      {isLoading && <SkeletonForm />}
      {category && (
        <AdminPageContainer
          heading={`${language.updateCategory} ${translateKey(category.categoryName, language)}`}
          variant="small"
        >
          <CategoryForm
            selectedCategory={category}
            onReset={() => refetch()}
            id={id || ''}
            popupMessage={language.categoryUpdated}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateCategoryPage;
