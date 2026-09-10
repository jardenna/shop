import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
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

  if (isLoading) {
    return <SkeletonFormPage count={4} />;
  }

  return (
    <AdminPageContainer heading={language.createNewCategory} variant="small">
      {allCategories && (
        <SubCategoryForm
          onReset={() => refetch}
          selectedCategory={null}
          id={null}
          parentCategories={allCategories.categories}
          popupMessage={language.categoryCreated}
        />
      )}
    </AdminPageContainer>
  );
};

export default CreateSubCategoryPage;
