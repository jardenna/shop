import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/productColorLists/ProductColorList';
import SizeListReadOnly from '../../../components/productSizeLists/SizeListReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <SizeListReadOnly sizes={product.sizes} />
    <ProductColorList colours={product.colors} />
  </>
);

export default ProductCardListContent;
