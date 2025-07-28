import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorReadOnly from '../../../components/productColorLists/ColorReadOnly';
import SizeListReadOnly from '../../../components/productLists/SizeListReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <SizeListReadOnly
      sizes={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorReadOnly colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
