import { FC } from 'react';
import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { ChangeInputType } from '../../types/types';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import HeaderIcons from './HeaderIcons';
import Logo from './Logo';

export interface Values {
  languageOption: SelectedLanguage;
}

export interface HeaderProps {
  ariaLabel: string;
  primaryActionBtn: any;
  userDropdownList: DropdownItem[];
  value: string;
  values: Values;
  onChange: (event: ChangeInputType) => void;
}
const Header: FC<HeaderProps> = ({
  ariaLabel,

  userDropdownList,
  primaryActionBtn,
  onChange,
  values,
}) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo />
      <Nav />
      <HeaderIcons
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
        onChange={onChange}
        values={values}
      />
    </div>
  </LayoutElement>
);
export default Header;
