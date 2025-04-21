import { useParams } from 'react-router';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: { category } = {}, isLoading } = useGetCategoryByIdQuery(
    params.id || '',
  );

  return (
    <section className="page-small">
      {isLoading && <SkeletonPage />}
      {category && (
        <>
          <PageHeader
            heading={`${language.updateCategory} ${category.categoryName}`}
          />
          <div className="page-card">
            <CategoryForm selectedCategory={category} id={params.id || ''} />
          </div>
        </>
      )}
    </section>
  );
};

export default UpdateCategoryPage;
