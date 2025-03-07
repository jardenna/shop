import { FC } from 'react';
import Icon, { IconName } from '../../components/icons/Icon';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import Logo from './Logo';

export interface HeaderProps {
  ariaLabel: string;
  defaultValue: Option;
  labelText: string;
  options: { label: string; value: string | number }[];
  onLanguageChange: (selectedLanguage: SelectedOption) => void;
}
const Header: FC<HeaderProps> = ({
  ariaLabel,
  onLanguageChange,
  defaultValue,
  options,
  labelText,
}) => (
  <>
    <LayoutElement as="header" className="main-header" ariaLabel={ariaLabel}>
      <div className="container main-header-container">
        <Logo />
        <Nav />
        <div>
          <Icon iconName={IconName.Search} title="" />
          <Icon iconName={IconName.User} title="" />
          <Icon iconName={IconName.ShoppingBack} title="" />
        </div>
      </div>

      <section className="hero">
        <div className="container">
          <h1>Special Fashion Sale</h1>
          <div>
            Upgrade your wardrobe with exclusive deals! For a limited time,
            enjoy incredible discounts on the latest fashion trends.
          </div>
          <button type="button">Shop now</button>
        </div>
      </section>
    </LayoutElement>
    <LanguageSelect
      options={options}
      onLanguageChange={onLanguageChange}
      labelText={labelText}
      defaultValue={defaultValue}
    />
  </>
);
export default Header;
