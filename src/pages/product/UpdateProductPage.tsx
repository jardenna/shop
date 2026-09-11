import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonUpdateProduct from '../../components/skeleton/SkeletonUpdateProduct';
import { useLanguage } from '../../features/language/useLanguage';
import ProductForm from '../../features/products/components/ProductForm';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/enums';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const UpdateProductPage = () => {
  const { id } = useParams();
  const { language } = useLanguage();

  const {
    data: product,
    isLoading,
    isError,
    error,
    refetch,
  } = useGetProductByIdQuery(id || '');

  const {
    data: subCategories,
    isLoading: isSubCategoriesLoading,
    isError: isSubCategoriesError,
  } = useGetSubCategoriesWithParentQuery();

  if (isError || isSubCategoriesError) {
    return (
      <NotFoundError
        error={error}
        btnLabel="products"
        path={AdminPath.AdminProducts}
      />
    );
  }

  if (isLoading || isSubCategoriesLoading) {
    return <SkeletonUpdateProduct />;
  }

  return (
    product &&
    subCategories && (
      <div className="flex flex-column">
        <SkeletonUpdateProduct />
        <AdminPageContainer
          heading={`${language.update} ${product.productName}`}
        >
          <ProductForm
            selectedProduct={product}
            refetch={refetch}
            images={product.images}
            id={id || null}
            parentCategories={subCategories}
            allowedSizes={product.subCategory.allowedSizes}
          />
        </AdminPageContainer>
      </div>
    )
  );
};

export default UpdateProductPage;
