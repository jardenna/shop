import type { Size } from '../../app/api/apiTypes/sharedApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ColorList from '../../features/shop/components/productLists/ColorList';
import SizeList from '../../features/shop/components/productLists/SizeList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import CardContent from './CardContent';

interface ProductCardCenterProps {
  allowedSizes: Size[];
  brand: string;
  colours: string[];
  countInStock: number;
  discount: number;
  material: string;
  sizes: Size[];
}

const ProductCardCenter = ({
  brand,
  colours,
  discount,
  material,
  countInStock,
  sizes,
  allowedSizes,
}: ProductCardCenterProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="center">
      <span className="separator" aria-hidden={true} />
      <LabelValueGrid text={language.productsInStock}>
        {countInStock} {language.pcs}
      </LabelValueGrid>
      {discount !== 0 && (
        <LabelValueGrid text={language.discount}>{discount} %</LabelValueGrid>
      )}
      <LabelValueGrid text={language.brand}>{brand}</LabelValueGrid>
      <LabelValueGrid text={language.material}>{material}</LabelValueGrid>
      <ColorList colors={colours} variant="small" />
      <SizeList allowedSizes={allowedSizes} sizes={sizes} />
    </CardContent>
  );
};

export default ProductCardCenter;
