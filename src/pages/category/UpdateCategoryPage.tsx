import { useParams } from 'react-router';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import useAuth from '../../features/auth/hooks/useAuth';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../pageContainer/AdminPageContainer';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const {
    data: { category } = {},
    isLoading,
    refetch,
  } = useGetCategoryByIdQuery(params.id || '');

  return (
    <article className="admin-page page-small">
      {isLoading && <SkeletonForm />}

      {category && (
        <PageContainer
          heading={`${language.updateCategory} ${category.categoryName}`}
          onReset={() => refetch()}
        >
          <CategoryForm
            selectedCategory={category}
            id={params.id || ''}
            allowedUpdateCategory={!!isAdmin}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default UpdateCategoryPage;
