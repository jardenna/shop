import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import { Favorites } from '../../../app/api/apiTypes/shopApiTypes';
import ColorList from '../../../components/productLists/ColorList';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardGridContentProps = {
  product: BaseProduct | Favorites;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <ColorList colors={product.colors} variant="mini" count={3} />
  </>
);

export default ProductCardGridContent;
