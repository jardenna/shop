import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/ProductColorList';
import ProductSizeList from '../../../components/productSizeList/ProductSizeList';
import ProductDiscountPrice from '../../products/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <h2 className="product-card-title">{product.productName}</h2>
    <p>{product.description}</p>
    <ProductDiscountPrice
      price={product.price}
      discount={product.discount || null}
    />

    <ProductSizeList sizes={product.sizes} variant="shop-product" />

    <ProductColorList colours={product.colors} optionSize="small" />
  </>
);

export default ProductCardListContent;
