import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/ProductColorList';
import ProductPrice from '../../../components/productPrice/ProductPrice';

type ProductCardGridContentProps = {
  product: BaseProduct;
};

const ProductCardGridContent = ({ product }: ProductCardGridContentProps) => (
  <>
    <ProductPrice price={product.price} discount={product.discount} />

    <ProductColorList colours={product.colors} optionSize="small" />
  </>
);

export default ProductCardGridContent;
