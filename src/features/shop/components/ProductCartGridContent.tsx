import ColorList from './productLists/ColorList';
import ProductPrice from './productPrice/ProductPrice';

interface ProductCartGridContentProps {
  colors: string[];
  discount: number;
  price: number;
}

const ProductCartGridContent = ({
  price,
  discount,
  colors,
}: ProductCartGridContentProps) => (
  <>
    <ProductPrice price={price} discount={discount} />
    <ColorList colors={colors} variant="mini" count={3} />
  </>
);

export default ProductCartGridContent;
