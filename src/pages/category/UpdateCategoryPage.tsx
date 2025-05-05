import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const {
    data: { category } = {},
    isLoading,
    refetch,
  } = useGetCategoryByIdQuery(params.id || '');

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}
      {category && (
        <>
          <PageHeader
            heading={`${language.updateCategory} ${category.categoryName}`}
          />
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            <CategoryForm selectedCategory={category} id={params.id || ''} />
          </ErrorBoundary>
        </>
      )}
    </article>
  );
};

export default UpdateCategoryPage;
