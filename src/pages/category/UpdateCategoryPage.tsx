import { useParams } from 'react-router';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: { category } = {} } = useGetCategoryByIdQuery(params.id || '');

  return (
    <section className="page-small">
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
