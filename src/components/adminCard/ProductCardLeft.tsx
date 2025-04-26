import { CategoryStatus } from '../../app/api/apiTypes';
import useLanguage from '../../features/language/useLanguage';
import Badge from '../badge/Badge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import { PrimaryActionBtnProps } from '../modal/Modal';

type ProductCardLeftProps = {
  countInStock: number;
  description: string;
  id: string;
  linkTo: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate: Date | null;
  status: CategoryStatus;
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
}: ProductCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent className="left" heading={null}>
      <div className="position-relative flex">
        <Badge
          badgeText={language[status.toLocaleLowerCase()]}
          className={status.toLowerCase()}
        />
        <div>
          <img alt="" loading="lazy" src="/images/uploads/image.jpg" />
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
