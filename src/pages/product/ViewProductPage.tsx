import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ProductCardCenter from '../../components/adminCard/ProductCardCenter';
import ProductCardLeft from '../../components/adminCard/ProductCardLeft';
import CardRight from '../../components/card/CardRight';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';

const sizeList = ['S', 'M', 'L', 'XL'];
const testSize = ['S', 'M', 'XL'];

const ViewProductPage = () => {
  const { language } = useLanguage();
  const params = useParams();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  const primaryActionBtn = {
    onClick: () => {
      console.log(12);
    },
    label: language.delete,
    variant: BtnVariant.Danger,
  };

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
        {product && (
          <article className="admin-card-container">
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <ProductCardLeft
                id={product.id}
                primaryActionBtn={primaryActionBtn}
                linkTo=""
                name={product.productName}
                scheduledDate={product.scheduledDate}
                status={product.productStatus}
                countInStock={product.countInStock}
                description={product.description}
              />
            </ErrorBoundary>

            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <ProductCardCenter
                brand={product.brand}
                colours={product.colors}
                discount={product.discount || 0}
                material={product.material}
                price={product.price}
                sizes={product.sizes}
                sizeList={sizeList}
                testSize={testSize}
              />
            </ErrorBoundary>

            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <CardRight
                linkTo={`/admin/${MainPath.AdminSubCategories}`}
                createdAt={product.createdAt}
                heading={`${language.category}: ${product.subCategory.subCategoryName}`}
                name={product.productName}
                showStatusMessage={
                  product.subCategory.categoryStatus !== 'Published'
                }
                statusMessage={`${language.categoryIs} ${language[product.subCategory.categoryStatus.toLowerCase()]}`}
              />
            </ErrorBoundary>
          </article>
        )}
      </div>
    </section>
  );
};

export default ViewProductPage;
