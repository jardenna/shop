import { IconName } from '../../types/enums';
import Icon from '../icons/Icon';
import Popup from './Popup';

interface TooltipProps {
  ariaLabel: string;
  iconName: IconName;
  tooltipContent: string;
}

const Tooltip = ({ ariaLabel, tooltipContent, iconName }: TooltipProps) => (
  <Popup
    popupType="tooltip"
    ariaLabel={ariaLabel}
    popupContent={tooltipContent}
  >
    <Icon iconName={iconName} size="1em" />
  </Popup>
);

export default Tooltip;
