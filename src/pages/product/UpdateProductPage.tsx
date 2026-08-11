import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import { useLanguage } from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetProductByIdQuery(id || '');

  const {
    data: subCategories,
    refetch: refetchSubCategories,
    isLoading: isSubCategoriesLoading,
    isError: isSubCategoriesError,
  } = useGetSubCategoriesWithParentQuery();

  const handleReset = () => {
    refetch(); // refetch product
    refetchSubCategories(); // refetch subcategories
  };

  if (isError || isSubCategoriesError) {
    return (
      <NotFoundError
        error={error}
        btnLabel={language.viewMyOrders}
        onClick={() => {
          refetch();
        }}
      />
    );
  }

  return (
    <>
      {(isLoading || isSubCategoriesLoading) && (
        <SkeletonPage count={3} height="14" />
      )}

      {product && subCategories && (
        <AdminPageContainer
          heading={`${language.update} ${product.productName}`}
        >
          <ProductForm
            selectedProduct={product}
            images={product.images}
            id={id || null}
            parentCategories={subCategories}
            allowedSizes={product.subCategory.allowedSizes}
            onReset={handleReset}
          />
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateProductPage;
