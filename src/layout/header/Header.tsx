import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import type {
  PrimaryActionBtnProps,
  SecondaryActionBtnProps,
} from '../../components/modal/Modal';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import type { SelectedLanguage } from '../../features/language/languageSlice';
import type { InputChangeHandler, OptionType } from '../../types/types';
import HeaderIcons from '../headerIcons/HeaderIcons';
import LayoutElement from '../LayoutElement';
import { ShopPath } from '../nav/enums';
import NavContainer from '../nav/NavContainer';
import { navList } from '../nav/navLists';
import './_header.scss';
import Logo from './Logo';

export type Values = {
  languageOption: SelectedLanguage;
};

export type HeaderProps = {
  ariaLabel: string;
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  isMobileSize: boolean;
  onChange: InputChangeHandler;
  primaryActionBtn: PrimaryActionBtnProps;
  secondaryActionBtn: SecondaryActionBtnProps;
  userDropdownList: DropdownItem[];
  values: Values;
  onSelectCurrency: (selectedOptions: OptionType) => void;
};

const Header = ({
  ariaLabel,
  userDropdownList,
  primaryActionBtn,
  onChange,
  values,
  currencyOptions,
  onSelectCurrency,
  defaultValue,
  secondaryActionBtn,
  isMobileSize,
}: HeaderProps) => (
  <LayoutElement className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo linkTo={ShopPath.Root} />
      {!isMobileSize ? (
        <NavContainer navList={navList} />
      ) : (
        <TogglePanel
          ariaControls="nav"
          preventClickOutside
          className="main-panel"
          triggerBtnClassName="menu-burger"
        >
          <NavContainer navList={navList} hideAria />
        </TogglePanel>
      )}
      <HeaderIcons
        userDropdownList={userDropdownList}
        primaryActionBtn={primaryActionBtn}
        onChange={onChange}
        values={values}
        currencyOptions={currencyOptions}
        onSelectCurrency={onSelectCurrency}
        defaultValue={defaultValue}
        secondaryActionBtn={secondaryActionBtn}
      />
    </div>
  </LayoutElement>
);

export default Header;
