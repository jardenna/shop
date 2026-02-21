import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from './productLists/ColorList';
import SizeList from './productLists/SizeList';
import ProductPrice from './productPrice/ProductPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p className="product-card-description">{product.description}</p>
    <ProductPrice price={product.price} discountPrice={product.discount} />
    <SizeList
      availableSizeList={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
