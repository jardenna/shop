import type { ProductSizes } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import GridTwoCol from '../GridTwoCol';
import ColorListReadOnly from '../productColorLists/ColorListReadOnly';
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

        <ColorListReadOnly colours={colours} count={colours.length} />
        <ColorReadOnly
          ariaId="colors"
          colors={colours}
          optionGroupTitle={language.colours}
        />

        <div>
          <SizeListReadOnly sizes={sizes} optionGroupTitle={language.sizes} />
        </div>
      </div>
    </CardContent>
  );
};

export default ProductCardCenter;
