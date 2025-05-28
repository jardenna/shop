import { ProductSizes } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import variables from '../../scss/variables.module.scss';
import { sizeList } from '../../utils/utils';
import CardContent from '../card/CardContent';

import GridTwoCol from '../GridTwoCol';

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
      <span className="separator" />
      <div className="product-list-container">
        <GridTwoCol>
          <strong>{language.productsInStock}:</strong> {countInStock}{' '}
          {language.items}.
        </GridTwoCol>
        {discount !== 0 && (
          <GridTwoCol>
            <strong>{language.discount}:</strong> {discount}%
          </GridTwoCol>
        )}
        <GridTwoCol>
          <strong>{language.brand}:</strong>
          {brand}
        </GridTwoCol>
        <GridTwoCol>
          <strong>{language.material}:</strong> {material}
        </GridTwoCol>
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
