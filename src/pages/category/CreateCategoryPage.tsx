import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../features/categories/CategoryForm';
import useLanguage from '../../features/language/useLanguage';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <section className="page-small">
      <PageHeader heading={language.createNewCategory} />
      <div className="page-card">
        <CategoryForm selectedCategory={null} id={null} />
      </div>
    </section>
  );
};

export default CreateCategoryPage;
