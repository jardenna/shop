import { useNavigate, useParams } from 'react-router';
import ProductCardCenter from '../../components/adminCard/ProductCardCenter';
import ProductCardLeft from '../../components/adminCard/ProductCardLeft';
import CardFooter from '../../components/card/CardFooter';
import CardRight from '../../components/card/CardRight';
import ErrorContent from '../../components/ErrorContent';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import SkeletonThreeCards from '../../components/skeleton/SkeletonThreeCards';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import {
  useDeleteProductMutation,
  useGetProductByIdQuery,
} from '../../features/products/productApiSlice';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant } from '../../types/enums';
import { getErrorMessage } from '../../utils/utils';
import PageContainer from '../pageContainer/PageContainer';

const ViewProductPage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  const handleGoback = () => {
    navigate(-1);
  };
  const { onAddMessagePopup } = useMessagePopup();

  // Redux hooks
  const {
    data: product,
    isLoading,
    refetch,
    error,
  } = useGetProductByIdQuery(params.id || '');

  const [deleteProduct] = useDeleteProductMutation();

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
    <article className="page page-large">
      {isLoading && <SkeletonThreeCards />}
      {error && (
        <ErrorContent
          onClick={handleGoback}
          errorText={getErrorMessage(error)}
          btnLabel={language.goBack}
        />
      )}
      {product && (
        <PageContainer
          heading={product.productName}
          linkText={language.createNewProduct}
          linkTo={`/admin/${MainPath.AdminProductCreate}`}
          onReset={() => refetch}
        >
          <article className="grid three-col admin-card-container">
            <ProductCardLeft
              name={product.productName}
              scheduledDate={product.scheduledDate || null}
              status={product.productStatus}
              countInStock={product.countInStock}
              description={product.description}
              images={product.images}
              onReset={() => refetch}
            />
            <ProductCardCenter
              brand={product.brand}
              colours={product.colors}
              discount={product.discount || 0}
              material={product.material}
              price={product.price}
              sizes={product.sizes}
              onReset={() => refetch}
            />
            <CardRight
              linkTo={`/admin/${MainPath.AdminSubCategories}`}
              heading={heading}
              onReset={() => refetch}
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
              modalHeaderText={language.deleteCategory}
              linkTo={`/admin/${MainPath.AdminProductUpdate}/${params.id}`}
              allowedToDelete={!!isAdmin}
            />
          </article>
        </PageContainer>
      )}
    </article>
  );
};

export default ViewProductPage;
