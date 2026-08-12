import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from './productLists/ColorList';
import ProductPrice from './productPrice/ProductPrice';

interface ProductCartGridContentProps {
  product: BaseProduct;
}

const ProductCartGridContent = ({ product }: ProductCartGridContentProps) => (
  <>
    <ProductPrice price={product.price} discount={product.discount} />
    <ColorList colors={product.colors} variant="mini" count={3} />
  </>
);

export default ProductCartGridContent;
