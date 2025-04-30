import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import ProductForm from '../../features/products/ProductForm';

const UpdateProductPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  return (
    <section className="page">
      {isLoading && <SkeletonPage />}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        {product && (
          <>
            <PageHeader heading={`${language.update} ${product.productName}`} />
            <div className="page-card">Product Image</div>
            <div className="flex flex-align-start">
              <div className="flex-2">
                <div className="page-card">Product information</div>
                <div className="page-card">Product Variants</div>
                <div className="page-card">Inventory</div>
              </div>
              <div className="flex-1">
                <div className="page-card">Pricing</div>
                <div className="page-card">Organize</div>
              </div>
            </div>

            <ProductForm selectedProduct={product} id={params.id || null} />
          </>
        )}
      </ErrorBoundary>
    </section>
  );
};

export default UpdateProductPage;
