import type { ProductPreview } from '../../../app/api/apiTypes/shopApiTypes';
import Price from '../../currency/components/Price';
import ColorList from './productLists/ColorList';

type ProductCardGridContentProps = {
  product: ProductPreview;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <Price price={product.price} discountPrice={product.discount} />
    <ColorList colors={product.colors} variant="mini" count={3} />
  </>
);

export default ProductCardGridContent;
