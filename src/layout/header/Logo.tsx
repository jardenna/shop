import { Link } from 'react-router';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';
import { MainPath } from '../nav/enums';

const Logo = ({ linkTo }: { linkTo: MainPath | string }) => (
  <div className="logo">
    <Link to={linkTo}>
      <Icon iconName={IconName.Logo} title="Logo" ariaHidden={false} />
    </Link>
  </div>
);

export default Logo;
