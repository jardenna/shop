import type { Size } from '../../app/api/apiTypes/sharedApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ColorList from '../../features/shop/components/productLists/ColorList';
import ProductList from '../../features/shop/components/productLists/ProductList';
import SizeList from '../../features/shop/components/SizeList';

import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import CartContent from './CartContent';

type ProductCartCenterProps = {
  allowedSizes: Size[];
  brand: string;
  colours: string[];
  countInStock: number;
  discount: number;
  material: string;
  sizes: Size[];
  onReset: () => void;
};

const ProductCartCenter = ({
  brand,
  colours,
  discount,
  material,
  onReset,
  countInStock,
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

      <ProductList
        groupTitle={{ title: language.sizes, id: '' }}
        className="color-list"
      >
        <SizeList allowedSizes={allowedSizes} sizes={sizes} />
      </ProductList>
    </CartContent>
  );
};

export default ProductCartCenter;
