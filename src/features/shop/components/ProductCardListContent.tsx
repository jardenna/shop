import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from './productLists/ColorList';
import SizeList from './productLists/SizeList';
import DiscountedPrice from './productPrice/DiscountedPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p className="product-card-description">{product.description}</p>
    <DiscountedPrice
      price={product.price}
      discount={product.discount}
      discountedPrice={product.discountedPrice}
    />
    <SizeList
      availableSizeList={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
