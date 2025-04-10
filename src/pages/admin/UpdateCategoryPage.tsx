import { useParams } from 'react-router';
import CategoryForm from '../../components/CategoryForm';
import { useGetCategoryByIdQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UpdateCategoryPage = () => {
  const params = useParams();

  const { data: selectedCategory } = useGetCategoryByIdQuery(params.id || '');

  const { language } = useLanguage();

  return (
    <section className="page-small">
      <h1>{language.createNewCategory}</h1>
      <div className="page-card">
        {selectedCategory && (
          <CategoryForm
            selectedCategory={selectedCategory.category}
            id={params.id || ''}
          />
        )}
      </div>
    </section>
  );
};

export default UpdateCategoryPage;
