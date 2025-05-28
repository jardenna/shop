import { ProductSizes } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import { sizeList } from '../../utils/utils';
import CardContent from '../card/CardContent';

import GridTwoCol1 from '../GridTwoCol1';

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
        <GridTwoCol1 text={language.productsInStock}>
          {countInStock} {language.items}.
        </GridTwoCol1>
        {discount !== 0 && (
          <GridTwoCol1 text={language.discount}>{discount}%</GridTwoCol1>
        )}
        <GridTwoCol1 text={language.brand}>{brand}</GridTwoCol1>
        <GridTwoCol1 text={language.material}>{material}</GridTwoCol1>
        <div>
          <strong className="product-list-headline">{language.colours}:</strong>
          <ul className="product-color-list">
            {colours.map((colour) => (
              <li
                key={colour}
                style={{
                  backgroundColor: colour,
                  borderColor:
                    colour === 'white' ? variables.colorIconBorder : '',
                }}
                className="option-icon"
              />
            ))}
          </ul>
        </div>
        <div>
          <strong className="product-list-headline">{language.sizes}:</strong>
          <ul className="product-size-list">
            {sizeList.map((size) => (
              <li
                className={`product-size-list-item ${sizes.includes(size) ? 'available' : 'unavailable'}`}
                key={size}
              >
                {size}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </CardContent>
  );
};

export default ProductCardCenter;
