import { useParams } from 'react-router';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: allCategories } = useGetAllCategoriesQuery();
  const { data: category, isLoading } = useGetSubCategoryByIdQuery(
    params.id || '',
  );

  return (
    <section className="page page-small">
      {isLoading && <SkeletonPage />}
      {allCategories && category && (
        <>
          <PageHeader
            heading={`${language.updateCategory} ${category.subCategoryName}`}
          />
          <div className="page-card">
            <SubCategoryForm
              selectedCategory={category}
              id={params.id || ''}
              parentCategories={allCategories.categories}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default UpdateSubCategoryPage;
