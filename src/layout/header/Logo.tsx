import { FC } from 'react';
import { Link } from 'react-router';
import Icon, { IconName } from '../../components/icons/Icon';
import { MainPath } from '../nav/enums';

interface LogoProps {
  link: MainPath | string;
}

const Logo: FC<LogoProps> = ({ link }) => (
  <div className="logo">
    <Link to={link}>
      <Icon iconName={IconName.Logo} title="Logo" />
    </Link>
  </div>
);

export default Logo;
