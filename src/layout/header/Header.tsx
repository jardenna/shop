import type { ActionNavItemProps } from '../../components/dropdownBtn/ActionNavBtn';
import type { SelectedLanguage } from '../../features/language/languageSlice';
import { useLanguage } from '../../features/language/useLanguage';
import type { InputChangeHandler } from '../../shared/types';
import HeaderIcons from '../headerIcons/HeaderIcons';
import LayoutElement from '../LayoutElement';
import MobileNav from '../nav/MobileNav';
import { ShopPath } from '../nav/navConstants';
import NavContainer from '../nav/NavContainer';
import { navList } from '../nav/navLists';
import './_header.scss';
import Logo from './Logo';

export interface Values {
  languageOption: SelectedLanguage;
}

interface MobileProps {
  isMobileSize: boolean;
}

export interface BaseHeaderProps {
  localLanguage: Record<string, string>;
  onChange: InputChangeHandler;
  values: Values;
}

export interface HeaderProps extends BaseHeaderProps {
  dropdownBtnList: ActionNavItemProps[];
  onSubmit: () => void;
}

const Header = ({
  dropdownBtnList,
  onChange,
  values,
  isMobileSize,
  onSubmit,
  localLanguage,
}: HeaderProps & MobileProps) => {
  const { language } = useLanguage();

  return (
    <LayoutElement className="main-header" ariaLabel={language.main}>
      <div className="container main-header-content">
        <Logo linkTo={ShopPath.Root} />
        {!isMobileSize ? (
          <NavContainer
            navList={navList}
            ariaLabel={language.main}
            className="main-nav-container"
          />
        ) : (
          <MobileNav
            navList={navList}
            className="main-nav-container"
            hidePanelHeading
          />
        )}
        <HeaderIcons
          dropdownBtnList={dropdownBtnList}
          onChange={onChange}
          values={values}
          localLanguage={localLanguage}
          onSubmit={onSubmit}
        />
      </div>
    </LayoutElement>
  );
};

export default Header;
