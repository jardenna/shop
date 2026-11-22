import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import MissingImage from '../formElements/fileInput/MissingImage';
import ImgList from '../ImgList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import CartContent from './CartContent';
import CartHeading from './CartHeading';

type ProductCartLeftProps = {
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  scheduledDate: Date | null;
  status: Status;
};

const ProductCartLeft = ({
  status,
  name,
  scheduledDate,
  description,
  images,
  price,
  discount,
}: ProductCartLeftProps) => {
  const { language } = useLanguage();

  return (
    <CartContent>
      {images.length > 0 ? <ImgList images={images} /> : <MissingImage />}
      <CartHeading
        status={status}
        scheduledDate={scheduledDate || null}
        name={name}
      />
      <p>{description}</p>
      <LabelValueGrid text={language.price}>
        <ProductPrice price={price} discount={discount} />
      </LabelValueGrid>
    </CartContent>
  );
};

export default ProductCartLeft;
