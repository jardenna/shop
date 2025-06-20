import SkeletonForm from '../../components/skeleton/SkeletonForm';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';
import PageContainer from '../pageContainer/PageContainer';

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
    <article className="page page-small">
      {isLoading && <SkeletonForm count={3} />}
      <PageContainer
        heading={language.createNewCategory}
        onReset={() => refetch}
      >
        {allCategories && (
          <SubCategoryForm
            selectedCategory={null}
            id={null}
            parentCategories={allCategories.categories}
          />
        )}
      </PageContainer>
    </article>
  );
};

export default CreateSubCategoryPage;
