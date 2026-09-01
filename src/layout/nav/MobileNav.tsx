import Button from '../../components/Button';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../components/togglePanel/useTogglePanel';
import { useLanguage } from '../../features/language/useLanguage';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

interface MobileNavProps {
  navList: NavListProps[];
  className?: string;
  navHeading?: string;
  onLogout?: () => void;
}

const MobileNav = ({
  navList,
  className,
  onLogout,
  navHeading,
}: MobileNavProps) => {
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel({
    preventClickOutside: true,
  });

  return (
    <TogglePanel
      onTogglePanel={onTogglePanel}
      isPanelShown={isPanelShown}
      className="mobile-nav-panel"
      panelRef={panelRef}
      ariaLabel={language.mainMenu}
      triggerBtnClassName="menu-burger"
      triggerBtnContent={<span className="menu-burger-item" aria-hidden />}
    >
      {navHeading && <div className="nav-header">{navHeading}</div>}
      <NavContainer navList={navList} className={className} hideAriaHasPopup />
      {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
    </TogglePanel>
  );
};

export default MobileNav;
