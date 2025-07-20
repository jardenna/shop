import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/productColorLists/ProductColorList';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardGridContentProps = {
  product: BaseProduct;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductDiscountPrice price={product.price} discount={product.discount} />

    <ProductColorList colours={product.colors} optionSize="small" />
  </>
);

export default ProductCardGridContent;
