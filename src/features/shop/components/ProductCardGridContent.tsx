import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorListReadOnly from '../../../components/productColorLists/ColorListReadOnly';
import ColorReadOnly from '../../../components/productColorLists/ColorReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardGridContentProps = {
  product: BaseProduct;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductDiscountPrice price={product.price} discount={product.discount} />

    <ColorListReadOnly colours={product.colors} optionSize="small" />
    <ColorReadOnly colors={product.colors} ariaId="colors" />
  </>
);

export default ProductCardGridContent;
