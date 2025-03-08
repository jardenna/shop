import { FC } from 'react';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
import useLanguage from '../../features/language/useLanguage';
import LayoutElement from '../LayoutElement';
import Nav from '../nav/Nav';
import './_header.scss';
import Logo from './Logo';
import HeaderIcons from './HeaderIcons';

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
          <HeaderIcons onClick={onClick} />
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
