import { ErrorBoundary } from 'react-error-boundary';
import { useParams } from 'react-router';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import ProductForm from '../../features/products/ProductForm';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';

const UpdateProductPage = () => {
  const params = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  const { data: subCategories, isLoading: subCategoriesIsLoading } =
    useGetSubCategoriesWithParentQuery();

  return (
    <section className="page">
      {isLoading && <SkeletonPage />}

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        {product && subCategories && (
          <>
            <PageHeader heading={`${language.update} ${product.productName}`} />

            <div className="page-card">
              <ProductForm
                selectedProduct={product}
                id={params.id || null}
                parentCategories={subCategories}
                isLoading={subCategoriesIsLoading}
              />
            </div>
          </>
        )}
      </ErrorBoundary>
    </section>
  );
};

export default UpdateProductPage;
