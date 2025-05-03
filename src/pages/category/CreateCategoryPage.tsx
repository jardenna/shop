import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../features/categories/CategoryForm';
import useLanguage from '../../features/language/useLanguage';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <article className="page page-small">
      <PageHeader heading={language.createNewCategory} />
      <CategoryForm selectedCategory={null} id={null} />
    </article>
  );
};

export default CreateCategoryPage;
