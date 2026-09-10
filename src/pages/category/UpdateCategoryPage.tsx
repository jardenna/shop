import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import { useLanguage } from '../../features/language/useLanguage';
import { AdminPath } from '../../layout/nav/enums';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateCategoryPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: { category } = {},
    isLoading,
    refetch,
    isError,
    error,
  } = useGetCategoryByIdQuery(id || '');

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="categories"
        path={AdminPath.AdminCategories}
      />
    );
  }

  if (isLoading) {
    return <SkeletonFormPage />;
  }

  return (
    category && (
      <AdminPageContainer
        heading={`${language.updateCategory} ${translateKey(category.categoryName, language)}`}
        variant="small"
      >
        <CategoryForm
          selectedCategory={category}
          onReset={() => refetch()}
          id={id || ''}
          popupMessage={language.categoryUpdated}
        />
      </AdminPageContainer>
    )
  );
};

export default UpdateCategoryPage;
