import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import ProductDiscountPrice from '../../features/currency/components/ProductDiscountPrice';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import MissingImage from '../formElements/fileInput/MissingImage';
import GridTwoCol from '../GridTwoCol';
import ImgList from '../ImgList';
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
    <CardContent heading={null} onReset={onReset}>
      {images.length > 0 ? <ImgList images={images} /> : <MissingImage />}
      <AdminCardHeading
        status={status}
        scheduledDate={scheduledDate || null}
        name={name}
        ariaLabel={language.productCard}
      />
      <p>{description}</p>
      <GridTwoCol text={language.price}>
        <ProductDiscountPrice price={price} discount={discount} />
      </GridTwoCol>
    </CardContent>
  );
};

export default ProductCardLeft;
