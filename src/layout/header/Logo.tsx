import { Link } from 'react-router';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';

const Logo = ({ linkTo }: { linkTo: string }) => (
  <div className="main-logo">
    <Link to={linkTo}>
      <Icon
        iconName={IconName.Logo}
        title="Fashion Fusion Logo"
        ariaHidden={false}
        desc="Site logo"
      />
    </Link>
  </div>
);

export default Logo;
