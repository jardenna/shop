import { useId } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import { useMediaQuery } from '../../hooks/useMediaQuery';
import { NavListProps } from '../../layout/nav/Nav';
import NavContainer from '../../layout/nav/NavContainer';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import Overlay from '../overlay/Overlay';
import './_toggle-panel.scss';
import { useTogglePanel } from './useTogglePanel';

type ToggleNavProps = {
  navList: NavListProps[];
  className?: string;
};

const ToggleNav = ({ navList, className }: ToggleNavProps) => {
  const togglePanelId = useId();
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { isPanelShown, onTogglePanel, panelRef } = useTogglePanel({
    preventClickOutside: true,
  });

  return (
    <>
      <Button
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={language.mainMenu}
        ariaControls={togglePanelId}
        className="menu-burger"
      >
        <span className="menu-burger-item" aria-hidden={true} />
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${isPanelShown ? 'shown' : ''}`}
        id={togglePanelId}
        aria-hidden={isPanelShown ? undefined : true}
      >
        <NavContainer
          navList={navList}
          className={className}
          hideAriaHasPopup
        />
      </div>
      {isPanelShown && !isMobileSize && <Overlay />}
    </>
  );
};

export default ToggleNav;
