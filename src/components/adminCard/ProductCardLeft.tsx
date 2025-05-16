import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import Badge from '../badge/Badge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import MissingImage from '../formElements/fileInput/MissingImage';
import Img from '../Img';
import AdminCard from './types';

type ProductCardLeftProps = AdminCard & {
  countInStock: number;
  description: string;
  images: string[];
  status: Status;
  onReset: () => void;
};

const ProductCardLeft = ({
  status,
  scheduledDate,
  countInStock,
  name,
  linkTo,
  id,
  description,
  primaryActionBtn,
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
      <div className="position-relative ">
        <Badge
          badgeText={getlowerCaseFirstLetter(status, language)}
          className={status.toLowerCase()}
        />
        <h2 className="admin-card-title">{name}</h2>
        <span>{language.qty}: </span>
        <span>{countInStock}</span>
        <p>{description}</p>
      </div>

      <CardFooter
        id={id}
        primaryActionBtn={primaryActionBtn}
        name={name}
        modalHeaderText={language.deleteCategory}
        linkTo={linkTo}
        scheduledDate={scheduledDate}
      />
    </CardContent>
  );
};

export default ProductCardLeft;
