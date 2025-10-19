import { useParams } from 'react-router';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();

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
            popupMessage={language.categoryUpdated}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateCategoryPage;
