import { useNavigate, useParams } from 'react-router';
import ProductCartCenter from '../../components/adminCart/ProductCartCenter';
import ProductCartLeft from '../../components/adminCart/ProductCartLeft';
import CartFooter from '../../components/cart/CartFooter';
import CartRight from '../../components/cart/CartRight';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import type { PrimaryActionBtnProps } from '../../components/modal/Modal';
import NotFoundError from '../../components/NotFoundError';
import SkeletonThreeCarts from '../../components/skeleton/SkeletonThreeCarts';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../features/products/productApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { handleApiError } from '../../utils/handleApiError';
import { translateKey } from '../../utils/utils';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const ViewProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: product,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetProductByIdQuery(id || '');

  const [deleteProduct] = useDeleteProductMutation();

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
    try {
      const result = await deleteProduct(id || '').unwrap();

      if (result.success) {
        onAddMessagePopup({
          message: result.message,
          withDelay: true,
        });

        navigate(AdminPath.AdminProducts);
      } else {
        onAddMessagePopup({
          messagePopupType: 'error',
          message: language.productNotFound,
          componentType: 'notification',
        });
      }
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: handleDeleteProduct,
    label: language.delete,
    variant: BtnVariant.Danger,
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
      {isLoading && <SkeletonThreeCarts />}

      {product && (
        <AdminPageContainer
          heading={product.productName}
          linkText={language.createNewProduct}
          linkTo={AdminPath.AdminProductCreate}
        >
          <section className="three-col admin-card-container">
            <ProductCartLeft
              name={product.productName}
              scheduledDate={product.scheduledDate || null}
              status={product.productStatus}
              description={product.description}
              images={product.images}
              price={product.price}
              discount={product.discount || 0}
              onReset={() => refetch()}
            />
            <ProductCartCenter
              countInStock={product.countInStock}
              brand={product.brand}
              colours={product.colors}
              discount={product.discount || 0}
              material={product.material}
              availableSizeList={product.sizes}
              onReset={() => refetch()}
              categoryName={product.categoryName}
              subCategoryName={product.subCategoryName}
            />
            <CartRight
              linkTo={AdminPath.AdminSubCategories}
              heading={heading}
              onReset={() => refetch()}
              name={product.productName}
              showStatusMessage={
                product.subCategory.categoryStatus !== 'Published'
              }
              statusMessage={statusMessage}
            />
            <CartFooter
              id={product.id}
              primaryActionBtn={primaryActionBtn}
              name={product.productName}
              modalHeaderText={language.deleteProduct}
              linkTo={`${AdminPath.AdminProductUpdate}/${id}`}
            />
          </section>
        </AdminPageContainer>
      )}
    </>
  );
};

export default ViewProductPage;
