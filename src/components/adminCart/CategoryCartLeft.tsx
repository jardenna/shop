import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import CartContent from '../cart/CartContent';
import AdminCartHeading from './AdminCartHeading';

type CategoryCartLeftProps = {
  name: string;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  status: Status;
  onReset: () => void;
};

const CategoryCartLeft = ({
  status,
  scheduledDate,
  productsInSubcategory,
  name,
  onReset,
}: CategoryCartLeftProps) => {
  const { language } = useLanguage();

  return (
    <CartContent onReset={onReset}>
      <AdminCartHeading
        scheduledDate={scheduledDate || null}
        name={name}
        status={status}
      />
      <span>
        {language.productsInSubcategory}: {productsInSubcategory} {language.pcs}
      </span>
    </CartContent>
  );
};

export default CategoryCartLeft;
