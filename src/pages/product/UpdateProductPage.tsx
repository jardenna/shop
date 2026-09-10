import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import SkeletonFormPage from '../../components/skeleton/SkeletonFormPage';
import { useLanguage } from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductByIdQuery(id || '');

  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    isError: isSubCategoriesError,
  } = useGetSubCategoriesWithParentQuery();

  if (isError || isSubCategoriesError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="products"
        path={AdminPath.AdminProducts}
      />
    );
  }

  if (isLoading || isSubCategoriesLoading) {
    return <SkeletonFormPage />;
  }

  return (
    <ErrorBoundary
      FallbackComponent={ErrorBoundaryFallback}
      onReset={() => refetch()}
    >
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
          />
        </AdminPageContainer>
      )}
    </ErrorBoundary>
  );
};

export default UpdateProductPage;
