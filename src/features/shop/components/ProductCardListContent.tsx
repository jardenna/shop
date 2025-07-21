import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorListReadOnly from '../../../components/productColorLists/ColorListReadOnly';
import SizeListReadOnly from '../../../components/productLists/SizeListReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <SizeListReadOnly sizes={product.sizes} />
    <ColorListReadOnly colours={product.colors} />
  </>
);

export default ProductCardListContent;
