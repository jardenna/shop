import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/ProductColorList';
import ProductPrice from '../../../components/productPrice/ProductPrice';
import ProductSizeList from '../../../components/productSizeList/ProductSizeList';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductPrice price={product.price} discount={product.discount} />

    <ProductSizeList sizes={product.sizes} variant="shop-product" />

    <ProductColorList colours={product.colors} />
  </>
);

export default ProductCardListContent;
