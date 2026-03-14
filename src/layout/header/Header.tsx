import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import type { PrimaryActionBtnProps } from '../../components/modal/Modal';
import type { SelectedLanguage } from '../../features/language/languageSlice';
import type { InputChangeHandler, OptionType } from '../../types/types';
import HeaderIcons from '../headerIcons/HeaderIcons';
import LayoutElement from '../LayoutElement';
import { ShopPath } from '../nav/enums';
import MobileNav from '../nav/MobileNav';
import NavContainer from '../nav/NavContainer';
import { navList } from '../nav/navLists';
import './_header.scss';
import Logo from './Logo';

export type Values = {
  languageOption: SelectedLanguage;
};

type MobileProps = {
  isMobileSize: boolean;
};

export type BaseHeaderProps = {
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  dropdownBtnList: DropdownItem[];
  onChange: InputChangeHandler;
  primaryActionBtn: PrimaryActionBtnProps;
  values: Values;
  onSelectCurrency: (selectedOptions: OptionType) => void;
};

const Header = ({
  dropdownBtnList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  onSelectCurrency,
  defaultValue,
  isMobileSize,
}: BaseHeaderProps & MobileProps) => (
  <LayoutElement className="main-header">
    <div className="container main-header-content">
      <Logo linkTo={ShopPath.Root} />
      {!isMobileSize ? (
        <NavContainer navList={navList} />
      ) : (
        <MobileNav navList={navList} />
      )}
      <HeaderIcons
        dropdownBtnList={dropdownBtnList}
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
