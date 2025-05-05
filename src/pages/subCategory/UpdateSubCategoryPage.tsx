import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        {allCategories && category && (
          <>
            <PageHeader
              heading={`${language.updateCategory} ${category.subCategoryName}`}
            />
            <div className="page-card">
              <SubCategoryForm
                selectedCategory={category}
                id={params.id || ''}
                parentCategories={allCategories.categories}
              />
            </div>
          </>
        )}
      </ErrorBoundary>
    </article>
  );
};

export default UpdateSubCategoryPage;
