import { ProductSizes } from '../../app/api/apiTypes';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';

type ProductCardCenterProps = {
  brand: string;
  colours: string[];
  discount: number;
  material: string;
  price: number;
  sizes: ProductSizes[];
};

const ProductCardCenter = ({
  brand,
  colours,
  discount,
  material,
  price,
  sizes,
}: ProductCardCenterProps) => {
  const { language } = useLanguage();
  return (
    <CardContent heading={null} className="center">
      <span>
        <strong>{language.price}:</strong>
        <ProductPrice price={price} />
      </span>
      <span>
        <strong>{language.brand}:</strong>
        {brand}
      </span>

      <span>
        <strong>{language.colours}:</strong>
        <ul>
          {colours.map((size) => (
            <li key={size}>{size}</li>
          ))}
        </ul>
      </span>

      {discount !== 0 && (
        <span>
          <strong>{language.discount}:</strong> {discount}
        </span>
      )}
      <span>
        <strong>{language.material}:</strong> {material}
      </span>
      <span>
        <strong>{language.sizes}:</strong>
        <ul>
          {sizes.map((size) => (
            <li key={size}>{size}</li>
          ))}
        </ul>
      </span>
    </CardContent>
  );
};

export default ProductCardCenter;
