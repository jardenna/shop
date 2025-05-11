import CategoryForm from '../../features/categories/CategoryForm';
import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../PageContainer';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <article className="page page-small">
      <PageContainer heading={language.createNewCategory}>
        <CategoryForm selectedCategory={null} id={null} />
      </PageContainer>
    </article>
  );
};

export default CreateCategoryPage;
