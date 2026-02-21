import type { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import ProductPrice from '../../currency/components/productPrice/ProductPrice';
import ColorList from './productLists/ColorList';

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
