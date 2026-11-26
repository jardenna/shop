import { useParams } from 'react-router';
import NotFoundError from '../../components/NotFoundError';
import SkeletonUpdateProduct from '../../components/skeleton/skeletonUpdateProduct/SkeletonUpdateProduct';
import { useLanguage } from '../../features/language/useLanguage';
import SelectField from '../../features/products/components/SelectField';
import { useGetProductByIdQuery } from '../../features/products/productApiSlice';
import { useGetSubCategoriesWithParentQuery } from '../../features/subCategories/subCategoryApiSlice';
import { AdminPath } from '../../layout/nav/navConstants';
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
      <AdminPageContainer heading={`${language.update} ${product.productName}`}>
        <SelectField
          parentCategories={subCategories}
          selectedProduct={product}
          allowedSizes={product.subCategory.allowedSizes}
          images={product.images}
          id={id || null}
          refetch={refetch}
        />
      </AdminPageContainer>
    )
  );
};

export default UpdateProductPage;
