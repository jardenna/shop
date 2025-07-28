import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorReadOnly from '../../../components/productColorLists/ColorReadOnly';
import SizeListReadOnly from '../../../components/productLists/SizeListReadOnly';
import { resolveAllowedSizes } from '../../../utils/sizeUtils';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => {
  const sizeList = resolveAllowedSizes({
    mainKey: product.categoryName,
    subKey: product.subCategoryName,
  });

  return (
    <>
      <p>{product.description}</p>
      <ProductDiscountPrice price={product.price} discount={product.discount} />
      <SizeListReadOnly sizes={product.sizes} sizeList={sizeList} />
      <ColorReadOnly colors={product.colors} variant="small" />
    </>
  );
};

export default ProductCardListContent;
