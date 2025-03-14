import { FC } from 'react';
import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import { OptionType } from '../../components/selectBox/SelectBox';
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
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  primaryActionBtn: any;
  userDropdownList: DropdownItem[];
  values: Values;
  onChange: (event: ChangeInputType) => void;
  onSelectCurrency: (selectedOptions: OptionType) => void;
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  userDropdownList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  onSelectCurrency,
  defaultValue,
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
        currencyOptions={currencyOptions}
        onSelectCurrency={onSelectCurrency}
        defaultValue={defaultValue}
      />
    </div>
  </LayoutElement>
);
export default Header;
