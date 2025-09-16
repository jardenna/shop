import Button from '../../../components/Button';
import { BtnVariant } from '../../../types/enums';
import { LinkText } from '../enums';

type SubNavMobileProps = {
  btnText: LinkText;
  className?: string;
  onClick: () => void;
};

const SubNavMobile = ({ btnText, className, onClick }: SubNavMobileProps) => (
  <li className="sub-nav-item">
    <Button
      className={`nav-btn ${className}`}
      variant={BtnVariant.Ghost}
      onClick={onClick}
    >
      {btnText}
    </Button>
  </li>
);

export default SubNavMobile;
