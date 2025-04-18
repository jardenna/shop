import { DropdownItem } from '../../components/dropdownBtn/DropdownBtn';
import { SecondaryActionBtnProps } from '../../components/modal/Modal';
import { OptionType } from '../../components/selectbox/Selectbox';
import { SelectedLanguage } from '../../features/language/languageSlice';
import { ChangeInputType } from '../../types/types';
import HeaderIcons from '../headerIcons/HeaderIcons';
import LayoutElement from '../LayoutElement';
import { MainPath } from '../nav/enums';
import Nav from '../nav/Nav';
import { navList } from '../nav/navList';
import './_header.scss';
import Logo from './Logo';

export type Values = {
  languageOption: SelectedLanguage;
};

export type HeaderProps = {
  ariaLabel: string;
  currencyOptions: OptionType[];
  defaultValue: OptionType;
  primaryActionBtn: any;
  secondaryActionBtn: SecondaryActionBtnProps;
  userDropdownList: DropdownItem[];
  values: Values;
  onChange: (event: ChangeInputType) => void;
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
}: HeaderProps) => (
  <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
    <div className="container main-header-container">
      <Logo link={MainPath.Root} />
      <Nav navList={navList} />
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
