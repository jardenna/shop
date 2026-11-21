import type { Status } from '../../app/api/apiTypes/adminApiTypes';
import { useLanguage } from '../../features/language/useLanguage';
import CardContent from './CardContent';
import CardHeading from './CardHeading';

type CategoryCardLeftProps = {
  name: string;
  productsInSubcategory: number;
  scheduledDate: Date | null;
  status: Status;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  productsInSubcategory,
  name,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();

  return (
    <CardContent>
      <CardHeading
        scheduledDate={scheduledDate || null}
        name={name}
        status={status}
      />
      <span className="text-pretty">
        {language.productsInSubcategory}: {productsInSubcategory} {language.pcs}
      </span>
    </CardContent>
  );
};

export default CategoryCardLeft;
