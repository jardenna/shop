import { useLanguage } from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const CreateProductPage = () => {
  const { language } = useLanguage();
  const { data: subCategories, refetch } = useGetSubCategoriesWithParentQuery();

  return (
    subCategories && (
      <AdminPageContainer heading={language.createNewProduct}>
        <ProductForm
          parentCategories={subCategories}
          selectedProduct={null}
          images={[]}
          allowedSizes={[]}
          id={null}
          refetch={refetch}
        />
      </AdminPageContainer>
    )
  );
};

export default CreateProductPage;
