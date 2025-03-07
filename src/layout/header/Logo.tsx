import { FC } from 'react';
import { Link } from 'react-router';
import Icon, { IconName } from '../../components/icons/Icon';
import { MainPath } from '../nav/enums';

const Logo: FC = () => (
  <div className="logo">
    <Link to={MainPath.Root}>
      <Icon iconName={IconName.Logo} title="Logo" />
    </Link>
  </div>
);

export default Logo;
