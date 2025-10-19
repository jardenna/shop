import { useParams } from 'react-router';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import useAuth from '../../features/auth/hooks/useAuth';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

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
    <>
      {isLoading && <SkeletonForm />}
      {category && (
        <AdminPageContainer
          heading={`${language.updateCategory} ${translateKey(category.categoryName, language)}`}
          variant="small"
          ariaLabelledby="update-category"
        >
          <CategoryForm
            selectedCategory={category}
            onReset={() => refetch()}
            id={params.id || ''}
            allowedUpdateCategory={isAdmin}
            popupMessage={language.categoryUpdated}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateCategoryPage;
