import { ReactNode, useRef } from 'react';
import { useAnimate } from '../../hooks/useAnimate';
import { useClickOutside } from '../../hooks/useClickOutside';
import { useInitialFocus } from '../../hooks/useInitialFocus';
import { useKeyPress } from '../../hooks/useKeyPress';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { KeyCode } from '../../types/enums';
import { RefElementType } from '../../types/types';
import BtnClose from '../BtnClose';
import Portal from '../Portal';
import './_panel.scss';

interface PanelProps {
  children: ReactNode;
  isPanelShown: boolean;
  ariaControls?: string;
  className?: string;
  hideBtnClose?: boolean;
  ignoreRefs?: RefElementType[];
  trapFocus?: boolean;
  onClosePanel: () => void;
}

const Panel = ({
  children,
  onClosePanel,
  isPanelShown,
  className = '',
  ariaControls,
  trapFocus,
  hideBtnClose,
  ignoreRefs = [],
}: PanelProps) => {
  const panelRef = useRef<HTMLElement>(null);

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

  useKeyPress(onClosePanel, [KeyCode.Esc]);

  useClickOutside(panelRef, onClosePanel, [panelRef, ...ignoreRefs]);

  if (!shouldRender) {
    return null;
  }

  return (
    <Portal portalId="panel">
      <section
        id={ariaControls}
        onTransitionEnd={onTransitionEnd}
        className={`panel ${className} transition from-right ${transitionState}`}
        ref={panelRef}
      >
        {children}

        {!hideBtnClose && <BtnClose onClick={onClosePanel} />}
      </section>
    </Portal>
  );
};

export default Panel;
