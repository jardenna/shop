import { Status } from '../../app/api/apiTypes';
import ProductPrice from '../../features/currency/components/ProductPrice';
import useLanguage from '../../features/language/useLanguage';
import ProductDiscountPrice from '../../pages/product/ProductDiscountPrice';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardContent from '../card/CardContent';
import MissingImage from '../formElements/fileInput/MissingImage';
import GridTwoCol from '../GridTwoCol';

import Img from '../Img';
import AdminCardHeading from './AdminCardHeading';

type ProductCardLeftProps = {
  countInStock: number;
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  scheduledDate: Date | null;
  status: Status;
  onReset: () => void;
};

const ProductCardLeft = ({
  status,
  countInStock,
  name,
  scheduledDate,
  description,
  images,
  onReset,
  price,
  discount,
}: ProductCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null} onReset={onReset}>
      {images.length > 0 ? (
        <ul className="product-img-list">
          {images.map((url) => (
            <li key={url}>
              <Img src={url} alt="" className="product-img-item" />
            </li>
          ))}
        </ul>
      ) : (
        <MissingImage />
      )}
      <AdminCardHeading
        badgeClassName={status.toLowerCase()}
        badgeText={getlowerCaseFirstLetter(status, language)}
        scheduledDate={scheduledDate || null}
        name={name}
      />
      <span>
        {language.qty}: {countInStock}
      </span>
      <p>{description}</p>
      <GridTwoCol>
        <strong>{language.price}:</strong>
        <span className="flex-align-right">
          {discount !== 0 ? (
            <ProductDiscountPrice price={price} discount={discount} />
          ) : (
            <ProductPrice price={price} />
          )}
        </span>
      </GridTwoCol>
    </CardContent>
  );
};

export default ProductCardLeft;
