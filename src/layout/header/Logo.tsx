import { Link } from 'react-router';
import Icon from '../../components/icons/Icon';
import { IconName } from '../../types/enums';
import { MainPath } from '../nav/enums';

const Logo = ({ link }: { link: MainPath | string }) => (
  <div className="logo">
    <Link to={link}>
      <Icon iconName={IconName.Logo} title="Logo" />
    </Link>
  </div>
);

export default Logo;
