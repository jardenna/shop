import SkeletonForm from '../../components/skeleton/SkeletonForm';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/components/SubCategoryForm';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

export type SubCategoryState = {
  category: string;
  subCategoryName: string;
  translationKey: string;
};

const CreateSubCategoryPage = () => {
  const { language } = useLanguage();
  const {
    data: allCategories,
    isLoading,
    refetch,
  } = useGetAllCategoriesQuery();

  return (
    <>
      {isLoading && <SkeletonForm count={4} />}
      <AdminPageContainer
        heading={language.createNewCategory}
        onReset={() => refetch()}
        variant="small"
        ariaLabelledby="create-sub-category"
      >
        {allCategories && (
          <SubCategoryForm
            selectedCategory={null}
            id={null}
            parentCategories={allCategories.categories}
            popupMessage={language.categoryCreated}
          />
        )}
      </AdminPageContainer>
    </>
  );
};

export default CreateSubCategoryPage;
