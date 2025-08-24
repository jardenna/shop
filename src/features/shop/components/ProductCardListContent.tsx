import type { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorList from '../../../components/productLists/ColorList';
import SizeList from '../../../components/productLists/SizeList';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p className="product-card-description">{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <SizeList
      availableSizeList={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorList colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
