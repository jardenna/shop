import { useParams } from 'react-router';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../PageContainer';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const {
    data: { category } = {},
    isLoading,
    refetch,
    error,
  } = useGetCategoryByIdQuery(params.id || '');

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}
      {error && 'data' in error && (
        <div>{(error.data as { message: string }).message}</div>
      )}
      {category && (
        <PageContainer
          heading={`${language.updateCategory} ${category.categoryName}`}
          onReset={() => refetch}
        >
          <CategoryForm selectedCategory={category} id={params.id || ''} />
        </PageContainer>
      )}
    </article>
  );
};

export default UpdateCategoryPage;
