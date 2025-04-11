import { CategoryStatus } from '../../app/api/apiTypes';
import CategoryForm from '../../components/CategoryForm';
import useLanguage from '../../features/language/useLanguage';

export type CategoryState = {
  categoryName: string;
  categoryStatus: CategoryStatus;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <section className="page-small">
      <h1>{language.createNewCategory}</h1>
      <div className="page-card">
        <CategoryForm selectedCategory={null} id={null} />
      </div>
    </section>
  );
};

export default CreateCategoryPage;
