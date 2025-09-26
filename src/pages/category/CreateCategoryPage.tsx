import useAuth from '../../features/auth/hooks/useAuth';
import CategoryForm from '../../features/categories/CategoryForm';
import useLanguage from '../../features/language/useLanguage';
import PageContainer from '../pageContainer/AdminPageContainer';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const allowedUpdateCategory = !!isAdmin;

  return (
    <article className="admin-page page-small">
      <PageContainer heading={language.createNewCategory}>
        <CategoryForm
          selectedCategory={null}
          id={null}
          allowedUpdateCategory={allowedUpdateCategory}
        />
      </PageContainer>
    </article>
  );
};

export default CreateCategoryPage;
