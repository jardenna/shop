import type { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import GridTwoCol from '../GridTwoCol';
import ColorReadOnly from '../productColorLists/ColorReadOnly';
import SizeListReadOnly from '../productLists/SizeListReadOnly';

type ProductCardCenterProps = {
  brand: string;
  colours: string[];
  countInStock: number;
  discount: number;
  material: string;
  price: number;
  sizes: ProductSizes[];
  onReset: () => void;
};

const ProductCardCenter = ({
  brand,
  colours,
  discount,
  material,
  sizes,
  onReset,
  countInStock,
}: ProductCardCenterProps) => {
  const { language } = useLanguage();

  return (
    <CardContent heading={null} onReset={onReset}>
      <span className="separator" aria-hidden={true} />
      <div className="product-list-container">
        <GridTwoCol text={language.productsInStock}>
          {countInStock} {language.items}.
        </GridTwoCol>
        {discount !== 0 && (
          <GridTwoCol text={language.discount}>{discount}%</GridTwoCol>
        )}
        <GridTwoCol text={language.brand}>{brand}</GridTwoCol>
        <GridTwoCol text={language.material}>{material}</GridTwoCol>
        <ColorReadOnly
          colors={colours}
          variant="small"
          groupTitle={{
            title: language.colours,
            id: 'view-product-colors',
          }}
        />
        <SizeListReadOnly
          sizes={sizes}
          groupTitle={{
            title: language.sizes,
            id: 'view-product-sizes',
          }}
        />
      </div>
    </CardContent>
  );
};

export default ProductCardCenter;
