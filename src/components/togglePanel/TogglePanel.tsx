import { ReactNode } from 'react';
import useLanguage from '../../features/language/useLanguage';
import useMediaQuery from '../../hooks/useMediaQuery ';
import useTrapFocus from '../../hooks/useTrapFocus';
import LayoutElement from '../../layout/LayoutElement';
import { BtnVariant } from '../../types/enums';
import BtnClose from '../BtnClose';
import Button from '../Button';
import Overlay from '../overlay/Overlay';
import './_toggle-panel.scss';
import useTogglePanel from './useTogglePanel';

type PanelPosition = 'right' | 'left' | 'bottom' | 'top';

type ActionBtnsProps = {
  primaryBtnText: string;
  secondaryBtnText: string;
  secondaryAction: () => void;
};

type TogglePanelProps = {
  ariaControls: string;
  children: ReactNode;
  className?: string;
  footer?: ActionBtnsProps;
  panelPosition?: PanelPosition;
  preventClickOutside?: boolean;
  showCloseIcon?: boolean;
  triggerBtnClassName?: string;
  triggerBtnContent?: ReactNode;
};

const TogglePanel = ({
  children,
  ariaControls,
  panelPosition = 'right',
  className = '',
  triggerBtnClassName,
  triggerBtnContent,
  showCloseIcon,
  preventClickOutside = false,
  footer,
}: TogglePanelProps) => {
  const { language } = useLanguage();
  const { isMobileSize } = useMediaQuery();
  const { isPanelShown, onTogglePanel, panelRef, onHidePanel } = useTogglePanel(
    { preventClickOutside },
  );
  const defaultAriaLabel = !isPanelShown
    ? language.showContent
    : language.hideContent;

  const ariaLabel = triggerBtnContent ? undefined : defaultAriaLabel;

  useTrapFocus({ id: 'togglePanel', popupRef: panelRef });

  return (
    <>
      <Button
        className={triggerBtnClassName}
        variant={BtnVariant.Ghost}
        ariaExpanded={isPanelShown}
        onClick={onTogglePanel}
        ariaLabel={ariaLabel}
        ariaHasPopup
        ariaControls={ariaControls}
      >
        {triggerBtnContent ? (
          triggerBtnContent
        ) : (
          <span className="menu-burger-item" aria-hidden={true} />
        )}
      </Button>
      <div
        ref={panelRef}
        className={`toggle-panel ${panelPosition} ${className} ${isPanelShown ? 'shown' : ''}`}
        id={ariaControls}
        aria-hidden={isPanelShown ? undefined : true}
      >
        {isPanelShown ? children : ''}
        {showCloseIcon && isPanelShown && <BtnClose onClick={onHidePanel} />}

        {isPanelShown && footer && (
          <LayoutElement as="footer" ariaLabel="panel" className="footer">
            <Button
              variant={BtnVariant.Secondary}
              onClick={footer.secondaryAction}
            >
              {language.clearAllFilters}
            </Button>
            <Button onClick={onHidePanel}>{footer.primaryBtnText}</Button>
          </LayoutElement>
        )}
      </div>
      {isPanelShown && !isMobileSize && <Overlay />}
    </>
  );
};

export default TogglePanel;
