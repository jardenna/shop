import { UserResponse } from '../../app/api/apiTypes';
import IconBtn from '../../components/IconBtn';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import useLanguage from '../../features/language/useLanguage';
import useMediaQuery from '../../hooks/useMediaQuery ';
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
  const { isMobileSize } = useMediaQuery();

  return (
    <section className={className} id={ariaControls}>
      {isMobileSize ? (
        <TogglePanel ariaControls="ariaControls">
          {' '}
          <Nav navItemsList={navList} ariaLabel={language.main} />
        </TogglePanel>
      ) : (
        <Nav navItemsList={navList} ariaLabel={language.main} />
      )}

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
    </section>
  );
};

export default NavContainer;
