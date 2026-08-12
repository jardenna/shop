import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import AdminCardHeading from './AdminCartHeading';

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
    <CardContent onReset={onReset}>
      <AdminCardHeading
        scheduledDate={scheduledDate || null}
        name={name}
        status={status}
      />
      <span>
        {language.productsInSubcategory}: {productsInSubcategory} {language.pcs}
      </span>
    </CardContent>
  );
};

export default CategoryCartLeft;
