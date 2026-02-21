import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import Price from '../../currency/components/Price';
import ColorList from './productLists/ColorList';
import SizeList from './productLists/SizeList';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p className="product-card-description">{product.description}</p>
    <Price price={product.price} discountPrice={product.discount} />
    <SizeList
      availableSizeList={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
