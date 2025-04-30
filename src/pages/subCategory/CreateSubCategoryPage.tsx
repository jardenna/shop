import { ErrorBoundary } from 'react-error-boundary';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';

export type SubCategoryState = {
  category: string;
  subCategoryName: string;
};

const CreateSubCategoryPage = () => {
  const { language } = useLanguage();
  const {
    data: allCategories,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery();

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}
      <PageHeader heading={language.createNewCategory} />
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <div className="page-card">
          {allCategories && (
            <SubCategoryForm
              selectedCategory={null}
              id={null}
              parentCategories={allCategories.categories}
            />
          )}
        </div>
      </ErrorBoundary>
    </article>
  );
};

export default CreateSubCategoryPage;
