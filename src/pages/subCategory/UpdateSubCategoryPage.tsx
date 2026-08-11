import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/components/SubCategoryForm';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateSubCategoryPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetSubCategoryByIdQuery(id || '');

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel={language.viewMyOrders}
        onClick={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <>
      {isLoading && <SkeletonForm count={3} />}
      {allCategories && category && (
        <AdminPageContainer
          variant="small"
          heading={`${language.update} ${translateKey(category.subCategoryName, language) || category.subCategoryName}`}
        >
          <SubCategoryForm
            selectedCategory={category}
            onReset={() => refetch()}
            id={id || ''}
            parentCategories={allCategories.categories}
            popupMessage={language.categoryUpdated}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateSubCategoryPage;
