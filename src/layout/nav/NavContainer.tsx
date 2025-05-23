import IconBtn from '../../components/IconBtn';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import { LinkText } from './enums';
import Nav from './Nav';
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

type NavContainerProps = {
  navList: NavItemsProps[];
  ariaLabel?: string;
  className?: string;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = '',
  ariaLabel,
}: NavContainerProps) => {
  const { language } = useLanguage();
  const { currentUser } = useAuth();

  return (
    <div className={className}>
      <Nav navItemsList={navList} ariaLabel={language.main} />
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

export default NavContainer;
