import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import Button from '../../components/Button';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import TopContainer from '../../components/TopContainer';
import DateDisplay from '../../features/categories/DateDisplay';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = () => {
    deleteSubCategory(params.id || '');
  };

  const {
    data: category,
    isLoading,
    isError,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        <div className="page-card">
          {!isError && category ? (
            <div>
              <div>Name: {category.subCategoryName}</div>
              <div>Status: {category.categoryStatus}</div>
              {category.scheduledDate && (
                <div>
                  Date:
                  <DateDisplay
                    date={category.scheduledDate}
                    hour="2-digit"
                    minute="2-digit"
                  />
                </div>
              )}

              <div>Parent category: {category.mainCategory.categoryName}</div>
              <Button onClick={handleDeleteSubCategory}>Klik</Button>
            </div>
          ) : (
            <span>error..</span>
          )}
        </div>
      </ErrorBoundary>
    </section>
  );
};

export default ViewSubCategoryPage;
