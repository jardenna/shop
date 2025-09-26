import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import PageContainer from '../pageContainer/PageContainer';

const CreateProductPage = () => {
  const { language } = useLanguage();
  const { data: subCategories, refetch } = useGetSubCategoriesWithParentQuery();

  return (
    <article className="admin-page">
      {subCategories && (
        <PageContainer
          heading={language.createNewProduct}
          onReset={() => refetch()}
        >
          <ProductForm
            selectedProduct={null}
            images={[]}
            id={null}
            parentCategories={subCategories}
            onReset={() => refetch()}
            allowedSizes={[]}
          />
        </PageContainer>
      )}
    </article>
  );
};

export default CreateProductPage;
