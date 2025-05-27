import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardContent from '../card/CardContent';
import MissingImage from '../formElements/fileInput/MissingImage';
import Img from '../Img';
import AdminCardHeading from './AdminCardHeading';

type ProductCardLeftProps = {
  countInStock: number;
  description: string;
  images: string[];
  name: string;
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
    </CardContent>
  );
};

export default ProductCardLeft;
