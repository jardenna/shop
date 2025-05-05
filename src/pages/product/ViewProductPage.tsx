import { ErrorBoundary } from 'react-error-boundary';
import { useNavigate, useParams } from 'react-router';
import { ProductSizes } from '../../app/api/apiTypes';
import ProductCardCenter from '../../components/adminCard/ProductCardCenter';
import ProductCardLeft from '../../components/adminCard/ProductCardLeft';
import CardRight from '../../components/card/CardRight';
import ErrorBoundaryFallback from '../../components/ErrorBoundaryFallback';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import PageHeader from '../../components/PageHeader';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';

export const sizeList: ProductSizes[] = ['S', 'M', 'L', 'XL'];

const ViewProductPage = () => {
  const { language } = useLanguage();
  const params = useParams();
  const navigate = useNavigate();

  const [deleteProduct] = useDeleteProductMutation();

  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');
  const { onAddMessagePopup } = useMessagePopup();

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(params.id || '').unwrap();

      if (result.success) {
        navigate(`/admin/${MainPath.AdminProducts}`);
        onAddMessagePopup({
          messagePopupType: 'success',
          message: language.productDeleted,
        });
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.productNotFound,
          componentType: 'notification',
        });
      }
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };

  const primaryActionBtn = {
    onClick: handleDeleteProduct,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  const mainCategory = product ? product.subCategory.category.categoryName : '';
  const subCategory = product ? product.subCategory.subCategoryName : '';
  const heading = `${language.category}: ${subCategory} / ${mainCategory}`;
  const subCategoryStatus = product
    ? language[product.subCategory.categoryStatus.toLowerCase()]
    : '';

  const statusMessage = `${language.categoryIs} ${subCategoryStatus}`;

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
                linkTo={`/admin/${MainPath.AdminProductUpdate}/${params.id}`}
                name={product.productName}
                scheduledDate={product.scheduledDate || null}
                status={product.productStatus}
                countInStock={product.countInStock}
                description={product.description}
                images={product.images}
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
              />
            </ErrorBoundary>

            <ErrorBoundary
              FallbackComponent={ErrorBoundaryFallback}
              onReset={() => refetch}
            >
              <CardRight
                linkTo={`/admin/${MainPath.AdminSubCategories}`}
                createdAt={product.createdAt}
                heading={heading}
                name={product.productName}
                showStatusMessage={
                  product.subCategory.categoryStatus !== 'Published'
                }
                statusMessage={statusMessage}
              />
            </ErrorBoundary>
          </article>
        )}
      </div>
    </section>
  );
};

export default ViewProductPage;
