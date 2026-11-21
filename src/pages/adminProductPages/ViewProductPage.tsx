import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';
import CardFooter from '../../components/adminCard/CardFooter';
import CardRight from '../../components/adminCard/CardRight';
import ProductCardCenter from '../../components/adminCard/ProductCardCenter';
import ProductCardLeft from '../../components/adminCard/ProductCardLeft';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import NotFoundError from '../../components/NotFoundError';
import SkeletonThreeCards from '../../components/skeleton/adminViewItemSkeletons/SkeletonThreeCards';
import { useToast } from '../../components/toast/hooks/useToast';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../features/products/productApiSlice';
import { AdminPath } from '../../layout/nav/navConstants';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const ViewProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const { onAddToast } = useToast();

  // Redux hooks
  const {
    data: product,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetProductByIdQuery(id || '');

  const [deleteProduct, { isLoading: isDeleteLoading }] =
    useDeleteProductMutation();

  if (isError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="products"
        path={AdminPath.AdminProducts}
      />
    );
  }

  const handleDeleteProduct = async () => {
    const result = await deleteProduct(id || '').unwrap();

    if (result.success) {
      onAddToast({
        message: result.message,
      });

      navigate(AdminPath.AdminProducts);
    } else {
      onAddToast({
        type: 'error',
        message: language.productNotFound,
      });
    }
  };

  const mainCategory = product ? product.categoryName : '';
  const subCategory = product ? product.subCategoryName : '';
  const heading = `${language.category}: ${translateKey(subCategory, language)} / ${translateKey(mainCategory, language)}`;

  const subCategoryStatus = product
    ? language[product.subCategory.categoryStatus.toLowerCase()]
    : '';

  const statusMessage = `${language.categoryIs} ${subCategoryStatus}`;

  return (
    <>
      {isLoading && <SkeletonThreeCards />}
      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={() => refetch}
      >
        {product && (
          <AdminPageContainer
            heading={product.productName}
            linkText={language.createNewProduct}
            linkTo={AdminPath.AdminProductCreate}
          >
            <section className="three-col admin-cart-container">
              <ProductCardLeft
                name={product.productName}
                scheduledDate={product.scheduledDate || null}
                status={product.productStatus}
                description={product.description}
                images={product.images}
                price={product.price}
                discount={product.discount || 0}
              />
              <ProductCardCenter
                countInStock={product.countInStock}
                brand={product.brand}
                colours={product.colors}
                discount={product.discount || 0}
                material={product.material}
                sizes={product.sizes}
                allowedSizes={product.allowedSizes}
              />
              <CardRight
                linkTo={AdminPath.AdminSubCategories}
                heading={heading}
                name={product.productName}
                showStatusMessage={
                  product.subCategory.categoryStatus !== 'Published'
                }
                statusMessage={statusMessage}
              />
              <CardFooter
                isLoading={isDeleteLoading}
                id={product.id}
                name={product.productName}
                modalHeaderText={language.deleteProduct}
                linkTo={`${AdminPath.AdminProductUpdate}/${id}`}
                onDelete={handleDeleteProduct}
              />
            </section>
          </AdminPageContainer>
        )}
      </ErrorBoundary>
    </>
  );
};

export default ViewProductPage;
