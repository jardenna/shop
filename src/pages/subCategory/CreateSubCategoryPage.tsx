import PageHeader from '../../components/PageHeader';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';

export type SubCategoryState = {
  category: string;
  subCategoryName: string;
};

const CreateSubCategoryPage = () => {
  const { language } = useLanguage();
  const { data: allCategories } = useGetAllCategoriesQuery();

  return (
    <section className="page">
      <PageHeader heading={language.createNewCategory} />
      <div className="page-card">
        {allCategories && (
          <SubCategoryForm
            selectedCategory={null}
            id={null}
            parentCategories={allCategories.categories}
          />
        )}
      </div>
    </section>
  );
};

export default CreateSubCategoryPage;
