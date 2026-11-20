import { Link } from 'react-router';
import Icon from '../../components/icons/Icon';

const Logo = ({ linkTo }: { linkTo: string }) => (
  <div className="main-logo">
    <Link to={linkTo}>
      <Icon
        iconName="logo"
        title="Fashion Fusion Logo"
        ariaHidden={false}
        desc="Site logo"
      />
    </Link>
  </div>
);

export default Logo;
