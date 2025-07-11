import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/ProductColorList';
import ProductSizeList from '../../../components/productSizeList/ProductSizeList';
import ProductDiscountPrice from '../../products/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductDiscountPrice
      price={product.price}
      discount={product.discount || null}
    />

    <ProductSizeList sizes={product.sizes} variant="shop-product" />

    <ProductColorList colours={product.colors} />
  </>
);

export default ProductCardListContent;
