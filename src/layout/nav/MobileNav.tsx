import Button from '../../components/Button';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../components/togglePanel/useTogglePanel';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

interface MobileNavProps {
  navList: NavListProps[];
  className?: string;
  onLogout?: () => void;
}

const MobileNav = ({ navList, className, onLogout }: MobileNavProps) => {
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
      <NavContainer navList={navList} className={className} hideAriaHasPopup />
      {onLogout && (
        <Button variant={BtnVariant.Ghost} onClick={onLogout}>
          {language.logout}
        </Button>
      )}
    </TogglePanel>
  );
};

export default MobileNav;
