import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ProductColorList from '../../../components/productColorList/ProductColorList';
import ProductSizeList from '../../../components/productSizeLists/ProductSizeList';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p>{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <ProductSizeList sizes={product.sizes} />
    <ProductColorList colours={product.colors} />
  </>
);

export default ProductCardListContent;
