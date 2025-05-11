import { useNavigate, useParams } from 'react-router';
import ErrorContent from '../../components/ErrorContent';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { getErrorMessage } from '../../utils/utils';
import PageContainer from '../PageContainer';

const UpdateCategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const {
    data: { category } = {},
    isLoading,
    refetch,
    error,
  } = useGetCategoryByIdQuery(params.id || '');

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <article className="page page-small">
      <SkeletonPage />
      {isLoading && <SkeletonPage />}
      {error && (
        <ErrorContent
          onClick={handleGoback}
          errorText={getErrorMessage(error)}
          btnLabel={language.goBack}
        />
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
