import ColorList from './productLists/ColorList';
import ProductPrice from './productPrice/ProductPrice';

interface ProductCardGridContentProps {
  colors: string[];
  discount: number;
  price: number;
}

const ProductCardGridContent = ({
  price,
  discount,
  colors,
}: ProductCardGridContentProps) => (
  <>
    <ProductPrice price={price} discount={discount} />
    <ColorList colors={colors} variant="mini" count={3} />
  </>
);

export default ProductCardGridContent;
