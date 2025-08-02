import { BaseProduct } from '../../../app/api/apiTypes/sharedApiTypes';
import ColorReadOnly from '../../../components/productLists/ColorReadOnly';
import SizeListReadOnly from '../../../components/productLists/SizeListReadOnly';
import ProductDiscountPrice from '../../currency/components/ProductDiscountPrice';

type ProductCardListContentProps = {
  product: BaseProduct;
};

const ProductCardListContent = ({ product }: ProductCardListContentProps) => (
  <>
    <p className="product-card-description">{product.description}</p>
    <ProductDiscountPrice price={product.price} discount={product.discount} />
    <SizeListReadOnly
      availableSizeList={product.sizes}
      subCategoryName={product.subCategoryName}
      categoryName={product.categoryName}
    />
    <ColorReadOnly colors={product.colors} variant="small" />
  </>
);

export default ProductCardListContent;
