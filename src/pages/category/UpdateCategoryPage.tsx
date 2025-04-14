import { useParams } from 'react-router';
import PageHeader from '../../components/PageHeader';
import CategoryForm from '../../features/categories/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UpdateCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: selectedCategory } = useGetCategoryByIdQuery(params.id || '');

  return (
    <section className="page-small">
      {selectedCategory && (
        <>
          <PageHeader
            heading={`${language.updateCategory} aa ${selectedCategory.id}`}
          />
          <div className="page-card">
            <CategoryForm
              selectedCategory={selectedCategory.category}
              id={params.id || ''}
            />
          </div>
        </>
      )}
    </section>
  );
};

export default UpdateCategoryPage;
