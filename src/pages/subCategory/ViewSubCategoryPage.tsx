import { useParams } from 'react-router';
import Button from '../../components/Button';
import TopContainer from '../../components/TopContainer';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteSubCategoryMutation,
  useGetSubCategoryByIdQuery,
} from '../../features/subCategories/subCategoryApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewSubCategoryPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();

  const handleDeleteSubCategory = () => {
    deleteSubCategory(params.id || '');
  };

  const {
    data: category,
    isLoading,
    isError,
  } = useGetSubCategoryByIdQuery(params.id || '');

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <section className="page">
      <TopContainer
        heading={language.categories}
        linkText={language.createNewCategory}
        linkTo={`/admin/${MainPath.AdminCategoryCreate}`}
      />
      <div className="page-card">
        {!isError && category ? (
          <div>
            <div>Name: {category.subCategoryName}</div>
            <Button onClick={handleDeleteSubCategory}>Klik</Button>

            <div>Name: {category.mainCategory.categoryName}</div>
          </div>
        ) : (
          <span>error..</span>
        )}
      </div>
    </section>
  );
};

export default ViewSubCategoryPage;
