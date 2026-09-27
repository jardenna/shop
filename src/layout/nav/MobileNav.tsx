import Button from '../../components/Button';
import TogglePanel from '../../components/togglePanel/TogglePanel';
import { useTogglePanel } from '../../components/togglePanel/useTogglePanel';
import { useLanguage } from '../../features/language/useLanguage';
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
    <TogglePanel
      onTogglePanel={onTogglePanel}
      onHidePanel={onHidePanel}
      isPanelShown={isPanelShown}
      ariaLabel={language.mainMenu}
      triggerBtnClassName="menu-burger"
      triggerBtnContent={<span className="menu-burger-item" aria-hidden />}
    >
      {navHeading && <div className="nav-heading">{navHeading}</div>}
      <NavContainer
        navList={navList}
        className={className}
        hideAriaHasPopup
        ariaLabel="main"
      />
      {onLogout && <Button onClick={onLogout}>{language.logout}</Button>}
    </TogglePanel>
  );
};

export default MobileNav;
