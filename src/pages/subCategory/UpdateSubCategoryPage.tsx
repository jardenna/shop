import { useParams } from 'react-router';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import SubCategoryForm from '../../features/subCategories/SubCategoryForm';
import PageContainer from '../PageContainer';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();
  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  return (
    <article className="page page-small">
      {isLoading && <SkeletonPage />}

      {allCategories && category && (
        <PageContainer
          heading={`${language.category} ${category.subCategoryName}`}
          onReset={() => refetch}
        >
          <SubCategoryForm
            selectedCategory={category}
            id={params.id || ''}
            parentCategories={allCategories.categories}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default UpdateSubCategoryPage;
