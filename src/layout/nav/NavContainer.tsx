import { UserResponse } from '../../app/api/apiTypes';
import IconBtn from '../../components/IconBtn';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import './_nav.scss';
import Nav, { NavItemsProps } from './Nav';
import NavUser from './NavUser';

export type ActionBtnProps = {
  ariaLabel?: string;
  className?: string;
  label?: string;
  onClick?: () => void;
};

type NavContainerProps = {
  navList: NavItemsProps[];
  ariaControls?: string;
  ariaLabel?: string;
  className?: string;
  currentUser?: UserResponse | null;
  isMenuCollapsed?: boolean;
  onCollapseMenu?: () => void;
};

const NavContainer = ({
  navList,
  isMenuCollapsed,
  onCollapseMenu,
  className = '',
  ariaLabel,
  currentUser,
  ariaControls,
}: NavContainerProps) => {
  const { language } = useLanguage();

  return (
    <div className={className} id={ariaControls}>
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
