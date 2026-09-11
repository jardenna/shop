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
          selectedProduct={null}
          images={[]}
          refetch={refetch}
          id={null}
          parentCategories={subCategories}
          allowedSizes={[]}
        />
      </AdminPageContainer>
    )
  );
};

export default CreateProductPage;
