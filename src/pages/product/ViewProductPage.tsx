import { useNavigate, useParams } from 'react-router';
import ProductCardCenter from '../../components/adminCard/ProductCardCenter';
import ProductCardLeft from '../../components/adminCard/ProductCardLeft';
import CardFooter from '../../components/card/CardFooter';
import CardRight from '../../components/card/CardRight';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import type { PrimaryActionBtnProps } from '../../components/modal/Modal';
import SkeletonThreeCards from '../../components/skeleton/SkeletonThreeCards';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../features/products/productApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import PageContainer from '../pageContainer/PageContainer';

const ViewProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: product,
    isLoading,
    refetch,
  } = useGetProductByIdQuery(params.id || '');

  const [deleteProduct] = useDeleteProductMutation();

  const handleDeleteProduct = async () => {
    try {
      const result = await deleteProduct(params.id || '').unwrap();

      if (result.success) {
        navigate(AdminPath.AdminProducts);
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

  const primaryActionBtn: PrimaryActionBtnProps = {
    onClick: handleDeleteProduct,
    label: language.delete,
    variant: BtnVariant.Danger,
  };

  const mainCategory = product ? product.categoryName : '';
  const subCategory = product ? product.subCategoryName : '';
  const heading = `${language.category}: ${subCategory} / ${mainCategory}`;
  const subCategoryStatus = product
    ? language[product.subCategory.categoryStatus.toLowerCase()]
    : '';

  const statusMessage = `${language.categoryIs} ${subCategoryStatus}`;

  return (
    <article className="admin-page">
      {isLoading && <SkeletonThreeCards />}

      {product && (
        <PageContainer
          heading={product.productName}
          linkText={language.createNewProduct}
          linkTo={AdminPath.AdminProductCreate}
          onReset={() => refetch()}
        >
          <article className="three-col admin-card-container">
            <ProductCardLeft
              name={product.productName}
              scheduledDate={product.scheduledDate || null}
              status={product.productStatus}
              description={product.description}
              images={product.images}
              price={product.price}
              discount={product.discount || 0}
              onReset={() => refetch()}
            />
            <ProductCardCenter
              countInStock={product.countInStock}
              brand={product.brand}
              colours={product.colors}
              discount={product.discount || 0}
              material={product.material}
              price={product.price}
              availableSizeList={product.sizes}
              onReset={() => refetch()}
              categoryName={product.categoryName}
              subCategoryName={product.subCategoryName}
            />
            <CardRight
              linkTo={AdminPath.AdminSubCategories}
              heading={heading}
              onReset={() => refetch()}
              name={product.productName}
              showStatusMessage={
                product.subCategory.categoryStatus !== 'Published'
              }
              statusMessage={statusMessage}
            />
            <CardFooter
              id={product.id}
              primaryActionBtn={primaryActionBtn}
              name={product.productName}
              modalHeaderText={language.deleteProduct}
              linkTo={`${AdminPath.AdminProductUpdate}/${params.id}`}
              allowedToDelete={!!isAdmin}
            />
          </article>
        </PageContainer>
      )}
    </article>
  );
};

export default ViewProductPage;
