import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavListProps } from '../../layout/nav/Nav';
import NavContainer from '../../layout/nav/NavContainer';
import Overlay from '../overlay/Overlay';
import TogglePanel from './TogglePanel';
import { useTogglePanel } from './useTogglePanel';

type MobileNavProps = {
  navList: NavListProps[];
  className?: string;
};

const MobileNav = ({ navList, className }: MobileNavProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
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
      triggerBtnContent={
        <span className="menu-burger-item" aria-hidden={true} />
      }
    >
      <NavContainer navList={navList} className={className} hideAriaHasPopup />
      {isPanelShown && !isMobileSize && <Overlay />}
    </TogglePanel>
  );
};

export default MobileNav;
