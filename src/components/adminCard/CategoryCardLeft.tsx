import { Status } from '../../app/api/apiTypes/sharedApiTypes';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
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
    <CardContent className="left" heading={null} onReset={onReset}>
      <AdminCardHeading
        badgeClassName={status.toLowerCase()}
        badgeText={getlowerCaseFirstLetter(status, language)}
        scheduledDate={scheduledDate || null}
        name={name}
        ariaLabel={language.categoryCard}
      />
      <span>
        {language.productsInSubcategory}: {productsInSubcategory}{' '}
        {language.items}.
      </span>
    </CardContent>
  );
};

export default CategoryCardLeft;
