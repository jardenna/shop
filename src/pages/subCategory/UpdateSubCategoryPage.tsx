import { useParams } from 'react-router';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/components/SubCategoryForm';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  // Redux hooks
  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  return (
    <>
      {isLoading && <SkeletonForm count={3} />}
      {allCategories && category && (
        <AdminPageContainer
          variant="small"
          heading={`${language.update} ${getlowerCaseFirstLetter(category.subCategoryName, language) || category.subCategoryName}`}
          ariaLabelledby={category.subCategoryName}
        >
          <SubCategoryForm
            selectedCategory={category}
            onReset={() => refetch()}
            id={params.id || ''}
            parentCategories={allCategories.categories}
            popupMessage={language.categoryUpdated}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateSubCategoryPage;
