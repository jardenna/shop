import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import PageContainer from '../pageContainer/PageContainer';

const UpdateProductPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  const { data: subCategories } = useGetSubCategoriesWithParentQuery();

  return (
    <article className="page">
      {isLoading && <SkeletonPage count={3} height="14" />}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch()}
      >
        {product && subCategories && (
          <PageContainer
            heading={`${language.update} ${product.productName}`}
            onReset={() => refetch()}
          >
            <ProductForm
              selectedProduct={product}
              images={product.images}
              id={params.id || null}
              parentCategories={subCategories}
              allowedSizes={product.subCategory.allowedSizes}
              onReset={() => refetch()}
            />
          </PageContainer>
        )}
      </ErrorBoundary>
    </article>
  );
};

export default UpdateProductPage;
