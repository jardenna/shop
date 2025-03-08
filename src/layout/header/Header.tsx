import { FC } from 'react';
import Button from '../../components/Button';
import LanguageSelect from '../../components/LanguageSelect';
import { Option, SelectedOption } from '../../components/selectBox/SelectBox';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
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

        <article className="hero">
          <div className="container">
            <section className="hero-content">
              <h1 className="hero-title">{language.heroTitle}</h1>
              <div className="hero-text">
                <p>{language.heroText}</p>
                <p>{language.heroText1}</p>
              </div>

              <Button variant={BtnVariant.Ghost}>
                <span>{language.shopNow}</span>
              </Button>
            </section>
          </div>
        </article>
      </LayoutElement>
    </article>
  );
};
export default Header;
