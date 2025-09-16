import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';

type SubNavMobileProps = {
  btnText: any;
  className?: string;
  onSelectedCategory: (id: LinkText) => void;
};

const SubNavMobile = ({
  btnText,
  className,
  onSelectedCategory,
}: SubNavMobileProps) => (
  <li className="sub-nav-item">
    <Button
      className={`nav-btn ${className}`}
      variant={BtnVariant.Ghost}
      onClick={() => {
        onSelectedCategory(btnText);
      }}
    >
      {btnText}
    </Button>
  </li>
);

export default SubNavMobile;
