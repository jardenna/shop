import Button from '../../components/Button';
import { useTogglePanel } from '../../components/togglePanel/useTogglePanel';
import PanelPopup from '../../features/cart/components/miniCartPopup/PanelPopup';
import { useLanguage } from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import NavContainer from './NavContainer';
import { NavListProps } from './navLists';

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
  const { isPanelShown, onTogglePanel, onHidePanel } = useTogglePanel({
    preventClickOutside: true,
  });

  return (
    <>
      <Button
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        variant={BtnVariant.Ghost}
        className="menu-burger"
      >
        <span className="menu-burger-item" aria-hidden />
      </Button>

      <PanelPopup
        onClosePanel={onHidePanel}
        isOpen={isPanelShown}
        className="mobile-nav-panel"
      >
        {navHeading && <div className="nav-heading">{navHeading}</div>}
        <NavContainer
          navList={navList}
          className={className}
          hideAriaHasPopup
          ariaLabel="main"
        />
        {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
      </PanelPopup>
    </>
  );
};

export default MobileNav;
