import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import CardContent from '../card/CardContent';
import MissingImage from '../formElements/fileInput/MissingImage';
import ImgList from '../ImgList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
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
    <CardContent onReset={onReset} className="left">
      {images.length > 0 ? (
        <ImgList images={images} onReset={onReset} />
      ) : (
        <MissingImage />
      )}
      <AdminCardHeading
        status={status}
        scheduledDate={scheduledDate || null}
        name={name}
      />
      <p>{description}</p>
      <LabelValueGrid text={language.price}>
        <ProductPrice price={price} discountPrice={discount} />
      </LabelValueGrid>
    </CardContent>
  );
};

export default ProductCardLeft;
