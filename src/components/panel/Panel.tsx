import { ReactNode, useRef } from 'react';
import { useAnimate } from '../../hooks/useAnimate';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useInitialFocus } from '../../hooks/useInitialFocus';
import { useMoveFocus } from '../../hooks/useMoveFocus';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { RefElementType } from '../../types/types';
import CloseBtn from '../CloseBtn';
import Portal from '../Portal';
import './_panel.scss';

interface PanelProps {
  children: ReactNode;
  isPanelShown: boolean;
  portalId: string;
  ariaControls?: string;
  className?: string;
  heading?: string;
  hideCloseBtn?: boolean;
  ignoreRefs?: RefElementType[];
  trapFocus?: boolean;
  closePanel: () => void;
}

const Panel = ({
  children,
  closePanel,
  isPanelShown,
  className = '',
  ariaControls,
  trapFocus,
  hideCloseBtn,
  ignoreRefs = [],
  portalId,
  heading,
}: PanelProps) => {
  const panelRef = useRef<HTMLElement>(null);

  useMoveFocus({
    closePopup: closePanel,
    isPopupOpen: isPanelShown,
  });

  const { shouldRender, transitionState, onTransitionEnd } = useAnimate({
    isOpen: isPanelShown,
  });

  useInitialFocus({
    popupRef: panelRef,
    enabled: isPanelShown && shouldRender,
  });

  useTrapFocus({
    popupRef: panelRef,
    enabled: Boolean(trapFocus && isPanelShown),
  });

  useClickOutside(panelRef, closePanel, [panelRef, ...ignoreRefs]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId={portalId}>
      <section
        id={ariaControls}
        onTransitionEnd={onTransitionEnd}
        className={`panel ${className} transition from-right ${transitionState}`}
        ref={panelRef}
      >
        {heading && <h2 className="panel-heading">{heading}</h2>}
        {children}

        {!hideCloseBtn && <CloseBtn onClick={closePanel} />}
      </section>
    </Portal>
  );
};

export default Panel;
