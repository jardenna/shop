import type { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import ColorList from './productLists/ColorList';
import DiscountedPrice from './productPrice/DiscountedPrice';

type ProductCardGridContentProps = {
  product: ProductPreview;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <DiscountedPrice
      price={product.price}
      discount={product.discount}
      discountedPrice={product.discountedPrice}
    />
    <ColorList colors={product.colors} variant="mini" count={3} />
  </>
);

export default ProductCardGridContent;
