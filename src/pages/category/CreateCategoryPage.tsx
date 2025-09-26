import useAuth from '../../features/auth/hooks/useAuth';
import CategoryForm from '../../features/categories/CategoryForm';
import useLanguage from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const allowedUpdateCategory = !!isAdmin;

  return (
    <AdminPageContainer heading={language.createNewCategory} variant="small">
      <CategoryForm
        selectedCategory={null}
        id={null}
        allowedUpdateCategory={allowedUpdateCategory}
      />
    </AdminPageContainer>
  );
};

export default CreateCategoryPage;
