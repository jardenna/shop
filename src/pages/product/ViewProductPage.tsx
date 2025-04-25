import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import CategoryCardLeft from '../../components/categoryCard/CategoryCardLeft';
import CategoryCardRight from '../../components/categoryCard/CategoryCardRight';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';

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
        {product && (
          <article className="category-card-container">
            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <CategoryCardLeft
                id={product.id}
                primaryActionBtn={primaryActionBtn}
                linkTo=""
                name=""
                scheduledDate={product.scheduledDate}
                status={product.productStatus}
                totalProducts={0}
              />
            </ErrorBoundary>

            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <CategoryCardRight
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
