import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import MissingImage from '../formElements/fileInput/MissingImage';
import ImgList from '../ImgList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import CardContent from './CardContent';
import CardHeading from './CardHeading';

interface ProductCardLeftProps {
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  scheduledDate: Date | null;
  status: Status;
}

const ProductCardLeft = ({
  status,
  name,
  scheduledDate,
  description,
  images,
  price,
  discount,
}: ProductCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent>
      {images.length > 0 ? <ImgList images={images} /> : <MissingImage />}
      <CardHeading
        status={status}
        scheduledDate={scheduledDate || null}
        name={name}
      />
      <p>{description}</p>
      <LabelValueGrid text={language.price}>
        <ProductPrice price={price} discount={discount} />
      </LabelValueGrid>
    </CardContent>
  );
};

export default ProductCardLeft;
