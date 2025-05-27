import { Status } from '../../app/api/apiTypes';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { getlowerCaseFirstLetter } from '../../utils/utils';
import CardBadge from '../card/CardBadge';
import CardContent from '../card/CardContent';
import CardFooter from '../card/CardFooter';
import { PrimaryActionBtnProps } from '../modal/Modal';

type CategoryCardLeftProps = {
  id: string;
  linkTo: string;
  name: string;
  primaryActionBtn: PrimaryActionBtnProps;
  scheduledDate: Date | null;
  status: Status;
  totalProducts: number;
  onReset: () => void;
};

const CategoryCardLeft = ({
  status,
  scheduledDate,
  totalProducts,
  name,
  linkTo,
  id,
  primaryActionBtn,
  onReset,
}: CategoryCardLeftProps) => {
  const { language } = useLanguage();
  const { isAdmin } = useAuth();

  return (
    <CardContent className="left" heading={null} onReset={onReset}>
      <div className="position-relative">
        <h2 className="admin-card-title">{name}</h2>
        <CardBadge
          badgeText={getlowerCaseFirstLetter(status, language)}
          badgeClassName={status.toLowerCase()}
          scheduledDate={scheduledDate || null}
        />
        <span>
          {language.totalProducts}: {totalProducts}
        </span>
      </div>
      <CardFooter
        id={id}
        primaryActionBtn={primaryActionBtn}
        name={name}
        modalHeaderText={language.deleteCategory}
        linkTo={linkTo}
        allowedToDelete={!!isAdmin}
      />
    </CardContent>
  );
};

export default CategoryCardLeft;
