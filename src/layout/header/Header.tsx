import { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
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

export interface BaseHeaderProps {
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  localLanguage: Record<string, string>;
  onChange: InputChangeHandler;
  values: Values;
  onSelectCurrency: (selectedOptions: OptionType) => void;
}

export interface HeaderProps extends BaseHeaderProps {
  currentUser: UserResponse | null;
  dropdownBtnList: DropdownItem[];
  isAuthReady: boolean;
  onSubmit: () => void;
}

const Header = ({
  dropdownBtnList,
  onChange,
  values,
  currencyOptions,
  onSelectCurrency,
  defaultValue,
  currentUser,
  isAuthReady,
  isMobileSize,
  onSubmit,
  localLanguage,
}: HeaderProps & MobileProps) => (
  <LayoutElement className="main-header" ariaLabel="main">
    <div className="container main-header-content">
      <Logo linkTo={ShopPath.Root} />
      {!isMobileSize ? (
        <NavContainer navList={navList} ariaLabel="main" />
      ) : (
        <MobileNav navList={navList} />
      )}
      <HeaderIcons
        dropdownBtnList={dropdownBtnList}
        onChange={onChange}
        values={values}
        currencyOptions={currencyOptions}
        onSelectCurrency={onSelectCurrency}
        defaultValue={defaultValue}
        localLanguage={localLanguage}
        currentUser={currentUser}
        isAuthReady={isAuthReady}
        onSubmit={onSubmit}
      />
    </div>
  </LayoutElement>
);

export default Header;
