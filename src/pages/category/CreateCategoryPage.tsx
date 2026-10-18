import CategoryForm from '../../features/categories/CategoryForm';
import { useLanguage } from '../../features/language/useLanguage';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

export type CategoryState = {
  categoryName: string;
};

const CreateCategoryPage = () => {
  const { language } = useLanguage();

  return (
    <AdminPageContainer heading={language.createNewCategory} variant="small">
      <CategoryForm id={null} popupMessage={language.categoryCreated} />
    </AdminPageContainer>
  );
};

export default CreateCategoryPage;
