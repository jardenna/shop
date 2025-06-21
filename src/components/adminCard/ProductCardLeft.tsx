import { Status } from '../../app/api/apiTypes/sharedTypes';
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
        ariaLabel={language.productCard}
      />
      <p>{description}</p>
      <GridTwoCol text={language.price}>
        {discount !== 0 ? (
          <ProductDiscountPrice price={price} discount={discount} />
        ) : (
          <ProductPrice price={price} />
        )}
      </GridTwoCol>
    </CardContent>
  );
};

export default ProductCardLeft;
