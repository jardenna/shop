import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/components/SubCategoryForm';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
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
        btnLabel="subCategories"
        path={AdminPath.AdminSubCategories}
      />
    );
  }

  return (
    <>
      {isLoading && <SkeletonFormPage count={4} />}
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
