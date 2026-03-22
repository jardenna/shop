import TogglePanel from '../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../components/togglePanel/useTogglePanel';
import { useLanguage } from '../../features/language/useLanguage';
import { NavListProps } from './Nav';
import NavContainer from './NavContainer';

type MobileNavProps = {
  navList: NavListProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: MobileNavProps) => {
  const { language } = useLanguage();
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel({
    preventClickOutside: true,
  });

  return (
    <TogglePanel
      onTogglePanel={onTogglePanel}
      isPanelShown={isPanelShown}
      panelRef={panelRef}
      ariaLabel={language.mainMenu}
      triggerBtnClassName="menu-burger"
      triggerBtnContent={<span className="menu-burger-item" aria-hidden />}
    >
      <NavContainer navList={navList} className={className} hideAriaHasPopup />
    </TogglePanel>
  );
};

export default MobileNav;
