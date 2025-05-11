import { useNavigate, useParams } from 'react-router';
import ErrorContent from '../../components/ErrorContent';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';
import { getErrorMessage } from '../../utils/utils';
import PageContainer from '../PageContainer';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
    error,
  } = useGetSubCategoryByIdQuery(params.id || '');

  const handleGoback = () => {
    navigate(-1);
  };

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}
      {error && (
        <ErrorContent
          onClick={handleGoback}
          errorText={getErrorMessage(error)}
          btnLabel={language.goBack}
        />
      )}

      {allCategories && category && (
        <PageContainer
          heading={`${language.category} ${category.subCategoryName}`}
          onReset={() => refetch}
        >
          <SubCategoryForm
            selectedCategory={category}
            id={params.id || ''}
            parentCategories={allCategories.categories}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default UpdateSubCategoryPage;
