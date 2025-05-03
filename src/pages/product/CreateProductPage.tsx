import PageHeader from '../../components/PageHeader';
import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/ProductForm';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';

const CreateProductPage = () => {
  const { language } = useLanguage();
  const { data: subCategories, isLoading: subCategoriesIsLoading } =
    useGetSubCategoriesWithParentQuery();

  return (
    <section className="page">
      <PageHeader heading={language.createNewProduct} />

      <div className="page-card">
        {subCategories && (
          <ProductForm
            selectedProduct={null}
            id={null}
            parentCategories={subCategories}
            isLoading={subCategoriesIsLoading}
          />
        )}
      </div>
    </section>
  );
};

export default CreateProductPage;
