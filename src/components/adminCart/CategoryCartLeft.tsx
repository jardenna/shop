import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import CartContent from './CartContent';
import CartHeading from './CartHeading';

type CategoryCartLeftProps = {
  name: string;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  status: Status;
};

const CategoryCartLeft = ({
  status,
  scheduledDate,
  productsInSubcategory,
  name,
}: CategoryCartLeftProps) => {
  const { language } = useLanguage();

  return (
    <CartContent>
      <CartHeading
        scheduledDate={scheduledDate || null}
        name={name}
        status={status}
      />
      <span className="text-pretty">
        {language.productsInSubcategory}: {productsInSubcategory} {language.pcs}
      </span>
    </CartContent>
  );
};

export default CategoryCartLeft;
