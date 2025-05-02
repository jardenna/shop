import { Status } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import Img from '../Img';
import AdminCard from './types';

type ProductCardLeftProps = AdminCard & {
  countInStock: number;
  description: string;
  status: Status;
  images?: string[];
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
}: ProductCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null}>
      <div className="position-relative flex">
        <Badge
          badgeText={language[status.toLowerCase()]}
          className={status.toLowerCase()}
        />
        <div>
          {images ? (
            images.map((url, idx) => <Img key={idx} src={url} alt="" />)
          ) : (
            <Img alt="" src="/images/uploads/image.jpg" />
          )}
        </div>
        <div>
          <h2 className="admin-card-title">{name}</h2>
          <span>{language.qty}: </span>
          <span>{countInStock}</span>
          <p>{description}</p>
        </div>
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
