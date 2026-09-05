import type { BaseShopProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from './productLists/ColorList';
import ProductPrice from './productPrice/ProductPrice';
import SizeList from './SizeList';

type ProductCartListContentProps = {
  product: BaseShopProduct;
};

const ProductCartListContent = ({ product }: ProductCartListContentProps) => (
  <>
    <p className="product-cart-description">{product.description}</p>
    <ProductPrice price={product.price} discount={product.discount} />
    <SizeList allowedSizes={product.allowedSizes} sizes={product.sizes} />
    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCartListContent;
