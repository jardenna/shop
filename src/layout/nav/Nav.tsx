import IconBtn from '../../components/IconBtn';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import { LinkText } from './enums';
import NavItemList from './NavItemList';
import NavUser from './NavUser';

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
  ariaLabel?: string;
  className?: string;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const Nav = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = '',
  ariaLabel,
}: NavProps) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className={className}>
      <NavItemList navItemsList={navList} ariaLabel={language.main} />
      {onCollapseMenu && (
        <IconBtn
          onClick={onCollapseMenu}
          ariaLabel={ariaLabel}
          iconName={IconName.ChevronLeft}
          title="chevron"
          ariaExpanded={!isMenuCollapsed}
        />
      )}
      {currentUser && <NavUser currentUser={currentUser} />}
    </div>
  );
};

export default Nav;
