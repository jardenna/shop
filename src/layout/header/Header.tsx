import type { ActionNavItemProps } from '../../components/dropdownBtn/ActionNavBtn';
import type { SelectChangeHandler } from '../../components/selectbox/SelectboxNew';
import { useLanguage } from '../../features/language/useLanguage';
import type {
  InputChangeHandler,
  Language,
  OptionType,
} from '../../shared/types';
import HeaderIcons from '../headerIcons/HeaderIcons';
import LayoutElement from '../LayoutElement';
import MobileNav from '../nav/MobileNav';
import { ShopPath } from '../nav/navConstants';
import NavContainer from '../nav/NavContainer';
import { navList } from '../nav/navLists';
import './_header.scss';
import type { LanguageCurrencyPreferencesValues } from './languageModal/LanguageCurrencyPreferences';
import Logo from './Logo';

interface MobileProps {
  isMobileSize: boolean;
}

export interface BaseHeaderProps {
  localLanguage: Language;
  onChange: InputChangeHandler;
  onSelectChange: SelectChangeHandler<OptionType>;
  values: LanguageCurrencyPreferencesValues;
  onSubmit: () => void;
}

export interface HeaderProps extends BaseHeaderProps {
  dropdownBtnList: ActionNavItemProps[];
}

const Header = ({
  dropdownBtnList,
  onChange,
  values,
  isMobileSize,
  onSubmit,
  localLanguage,
  onSelectChange,
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
          onSelectChange={onSelectChange}
        />
      </div>
    </LayoutElement>
  );
};

export default Header;
