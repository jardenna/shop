import BtnClose from '../BtnClose';
import Overlay from '../overlay/Overlay';
import { BaseTogglePanelProps } from './TogglePanel';

interface PanelProps extends BaseTogglePanelProps {
  togglePanelId: string;
}

const Panel = ({
  panelRef,
  className = '',
  togglePanelId,
  onHidePanel,
  children,
  isPanelShown,
}: PanelProps) => (
  <>
    <div
      ref={panelRef}
      className={`toggle-panel ${className} ${isPanelShown ? 'shown' : ''}`}
      id={togglePanelId}
    >
      {onHidePanel && <BtnClose onClick={onHidePanel} />}
      {children}
    </div>
    {isPanelShown && <Overlay />}
  </>
);

export default Panel;
