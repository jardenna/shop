import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorListReadOnly from '../../../components/productColorLists/ColorListReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardGridContentProps = {
  product: BaseProduct;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductDiscountPrice price={product.price} discount={product.discount} />

    <ColorListReadOnly colours={product.colors} optionSize="small" />
  </>
);

export default ProductCardGridContent;
