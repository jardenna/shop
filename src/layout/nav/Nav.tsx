import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import { LinkText } from './enums';
import NavItemList from './NavItemList';

export type NavItemsProps = {
  linkText: LinkText;
  path: string;
  iconName?: IconName;
  iconSize?: string;
};

export type ActionBtnProps = {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
};

type NavProps = {
  navList: NavItemsProps[];
  className?: string;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const Nav = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = '',
}: NavProps) => {
  const { language } = useLanguage();

  return (
    <div className={`main-nav ${className}`}>
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
      {onCollapseMenu && (
        <IconBtn
          onClick={onCollapseMenu}
          ariaLabel={
            isMenuCollapsed ? language.expandMenu : language.collapseMenu
          }
          iconName={IconName.ChevronLeft}
          title="chevron"
          ariaExpanded={!isMenuCollapsed}
        />
      )}
    </div>
  );
};

export default Nav;
