import { useParams } from 'react-router';
import SkeletonPage from '../../components/skeleton/SkeletonPage';
import useLanguage from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

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
    <>
      {isLoading && <SkeletonPage count={3} height="14" />}

      {product && subCategories && (
        <AdminPageContainer
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
        </AdminPageContainer>
      )}
    </>
  );
};

export default UpdateProductPage;
