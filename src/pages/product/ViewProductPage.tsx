import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';

const ViewProductPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  console.log(product);

  return (
    <section className="page">
      {isLoading && <SkeletonPage />}
      {product && (
        <PageHeader
          heading={product.productName}
          linkText={language.createNewProduct}
          linkTo={`/admin/${MainPath.AdminProductCreate}`}
        />
      )}
      <div className="page-card">
        <ErrorBoundary
          FallbackComponent={ErrorBoundaryFallback}
          onReset={() => refetch}
        >
          qq
        </ErrorBoundary>
      </div>
    </section>
  );
};

export default ViewProductPage;
