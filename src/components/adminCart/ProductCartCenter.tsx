import type {
  MainCategoryNames,
  Size,
  SubCategoryNames,
} from '../../app/api/apiTypes/sharedApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ColorList from '../../features/shop/components/productLists/ColorList';
import ProductListItem from '../../features/shop/components/productLists/ProductListItem';
import SizeList from '../../features/shop/components/productLists/SizeList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import CartContent from './CartContent';

type ProductCartCenterProps = {
  allowedSizes: Size[];
  availableSizeList: Size[];
  brand: string;
  categoryName: MainCategoryNames;
  colours: string[];
  countInStock: number;
  discount: number;
  material: string;
  sizes: Size[];
  subCategoryName: SubCategoryNames;
  onReset: () => void;
};

const ProductCartCenter = ({
  brand,
  colours,
  discount,
  material,
  availableSizeList,
  onReset,
  countInStock,
  categoryName,
  subCategoryName,
  sizes,
  allowedSizes,
}: ProductCartCenterProps) => {
  const { language } = useLanguage();

  return (
    <CartContent onReset={onReset} className="center">
      <span className="separator" aria-hidden={true} />
      <LabelValueGrid text={language.productsInStock}>
        {countInStock} {language.pcs}
      </LabelValueGrid>
      {discount !== 0 && (
        <LabelValueGrid text={language.discount}>{discount} %</LabelValueGrid>
      )}
      <LabelValueGrid text={language.brand}>{brand}</LabelValueGrid>
      <LabelValueGrid text={language.material}>{material}</LabelValueGrid>
      <ColorList
        colors={colours}
        variant="small"
        groupTitle={{
          title: language.colours,
          id: 'view-product-colors',
        }}
      />

      <div className="form-label-container">
        <span className="title" id="view-product-sizes">
          {language.sizes}
        </span>
      </div>
      <ul className="product-list size-list size-list">
        {allowedSizes.map((size) => (
          <ProductListItem
            key={size}
            text={size}
            unavailable={!sizes.includes(size)}
          />
        ))}
      </ul>
      <SizeList
        availableSizeList={availableSizeList}
        categoryName={categoryName}
        subCategoryName={subCategoryName}
        groupTitle={{
          title: language.sizes,
          id: 'view-product-sizes',
        }}
      />
    </CartContent>
  );
};

export default ProductCartCenter;
