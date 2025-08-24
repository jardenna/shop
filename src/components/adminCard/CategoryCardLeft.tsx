import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import useLanguage from '../../features/language/useLanguage';
import CardContent from '../card/CardContent';
import AdminCardHeading from './AdminCardHeading';

type CategoryCardLeftProps = {
  name: string;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  status: Status;
  onReset: () => void;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  productsInSubcategory,
  name,
  onReset,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent heading={null} onReset={onReset}>
      <AdminCardHeading
        scheduledDate={scheduledDate || null}
        name={name}
        ariaLabel={language.categoryCard}
        status={status}
      />
      <span>
        {language.productsInSubcategory}: {productsInSubcategory} {language.pcs}
      </span>
    </CardContent>
  );
};

export default CategoryCardLeft;
