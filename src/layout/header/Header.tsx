import { FC } from 'react';
import IconBtn from '../../components/IconBtn';
import Icon, { IconName } from '../../components/icons/Icon';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
import useLanguage from '../../features/language/useLanguage';
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
}) => {
  const { language } = useLanguage();
  const onClick = () => {
    console.log(123);
  };

  return (
    <article>
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
          <section>
            <IconBtn
              iconName={IconName.Search}
              title={language.search}
              onClick={onClick}
              ariaLabel={language.search}
            />
            <IconBtn
              iconName={IconName.User}
              title={language.user}
              onClick={onClick}
              ariaLabel={language.myAccount}
            />
            <IconBtn
              iconName={IconName.ShoppingBack}
              title={language.bag}
              onClick={onClick}
              ariaLabel={language.myBag}
            />
            <IconBtn
              iconName={IconName.Currency}
              title={language.currency}
              onClick={onClick}
              ariaLabel={language.currency}
            />

            <Icon iconName={IconName.Language} title="" />
          </section>
        </div>

        <section className="hero">
          <div className="container">
            <h1>{language.heroTitle}</h1>
            <div>{language.heroText}</div>
            <button type="button">{language.shopNow}</button>
          </div>
        </section>
      </LayoutElement>
    </article>
  );
};
export default Header;
