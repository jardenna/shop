import { useParams } from 'react-router';
import SkeletonForm from '../../components/skeleton/SkeletonForm';
import { useGetAllCategoriesQuery } from '../../features/categories/categoriyApiSlice';
import useLanguage from '../../features/language/useLanguage';
import SubCategoryForm from '../../features/subCategories/components/SubCategoryForm';
import { useGetSubCategoryByIdQuery } from '../../features/subCategories/subCategoryApiSlice';
import PageContainer from '../pageContainer/AdminPageContainer';

const UpdateSubCategoryPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  // Redux hooks
  const { data: allCategories } = useGetAllCategoriesQuery();
  const {
    data: category,
    isLoading,
    refetch,
  } = useGetSubCategoryByIdQuery(params.id || '');

  return (
    <article className="admin-page page-small">
      {isLoading && <SkeletonForm count={3} />}

      {allCategories && category && (
        <PageContainer
          heading={`${language.update} ${language.category} ${category.subCategoryName}`}
          onReset={() => refetch()}
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
