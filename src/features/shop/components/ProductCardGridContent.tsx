import type { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import ColorList from './productLists/ColorList';
import ProductPrice from './productPrice/ProductPrice';

type ProductCardGridContentProps = {
  product: ProductPreview;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductPrice price={product.price} discountPrice={product.discount} />
    <ColorList colors={product.colors} variant="mini" count={3} />
  </>
);

export default ProductCardGridContent;
