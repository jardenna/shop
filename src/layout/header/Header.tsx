import { FC } from 'react';
import { DropdownListProps } from '../../components/dropdownBtn/DropdownBtn';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
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
  userDropdownList: DropdownListProps[];
  onLanguageChange: (selectedLanguage: SelectedOption) => void;
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  onLanguageChange,
  defaultValue,
  options,
  labelText,
  userDropdownList,
}) => {
  const onClick = () => {
    console.log(123);
  };

  return (
    <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
      <div className="container main-header-container">
        <Logo />
        <LanguageSelect
          options={options}
          onLanguageChange={onLanguageChange}
          labelText={labelText}
          defaultValue={defaultValue}
        />
        <Nav />
        <HeaderIcons onClick={onClick} userDropdownList={userDropdownList} />
      </div>
    </LayoutElement>
  );
};
export default Header;
