import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';

const UpdateProductPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  return (
    <section className="page page-small">
      {isLoading && <SkeletonPage />}
      {product && (
        <>
          <PageHeader heading={`${language.update} ${product.productName}`} />
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => refetch}
          >
            form
          </ErrorBoundary>
        </>
      )}
    </section>
  );
};

export default UpdateProductPage;
