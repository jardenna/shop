import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/ProductForm';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import PageContainer from '../PageContainer';

const CreateProductPage = () => {
  const { language } = useLanguage();
  const {
    data: subCategories,
    isLoading: subCategoriesIsLoading,
    refetch,
  } = useGetSubCategoriesWithParentQuery();

  return (
    <article className="page">
      {subCategories && (
        <PageContainer
          heading={language.createNewProduct}
          onReset={() => refetch}
        >
          <ProductForm
            selectedProduct={null}
            id={null}
            parentCategories={subCategories}
            isLoading={subCategoriesIsLoading}
            onReset={() => refetch}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default CreateProductPage;
