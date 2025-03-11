import { FC } from 'react';
import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import { Option } from '../../components/selectBox/SelectBox';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import HeaderIcons from './HeaderIcons';
import Logo from './Logo';

export interface HeaderProps {
  ariaLabel: string;
  defaultValue: Option;
  labelText: string;
  options: { label: string; value: string | number }[];
  userDropdownList: DropdownItem[];
  value: string;
  onLanguageChange: (selectedLanguage: string) => void;
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  onLanguageChange,

  value,
  userDropdownList,
}) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo />

      <Nav />
      <HeaderIcons
        userDropdownList={userDropdownList}
        onLanguageChange={onLanguageChange}
        value={value}
      />
    </div>
  </LayoutElement>
);
export default Header;
