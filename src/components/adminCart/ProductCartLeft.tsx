import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import ProductPrice from '../../features/shop/components/productPrice/ProductPrice';
import CartContent from '../cart/CartContent';
import MissingImage from '../formElements/fileInput/MissingImage';
import ImgList from '../ImgList';
import LabelValueGrid from '../labelValueGrid/LabelValueGrid';
import AdminCartHeading from './AdminCartHeading';

type ProductCartLeftProps = {
  description: string;
  discount: number;
  images: string[];
  name: string;
  price: number;
  scheduledDate: Date | null;
  status: Status;
  onReset: () => void;
};

const ProductCartLeft = ({
  status,
  name,
  scheduledDate,
  description,
  images,
  onReset,
  price,
  discount,
}: ProductCartLeftProps) => {
  const { language } = useLanguage();

  return (
    <CartContent onReset={onReset}>
      {images.length > 0 ? (
        <ImgList images={images} onReset={onReset} />
      ) : (
        <MissingImage />
      )}
      <AdminCartHeading
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
