import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorReadOnly from '../../../components/productColorLists/ColorReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardGridContentProps = {
  product: BaseProduct;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <ColorReadOnly colors={product.colors} />
  </>
);

export default ProductCardGridContent;
