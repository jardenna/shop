import { type IconNameValue } from '../../types/enums';
import Icon from '../icons/Icon';
import Popup from './Popup';

interface TooltipProps {
  ariaLabel: string;
  tooltipContent: string;
  iconName?: IconNameValue;
}

const Tooltip = ({
  ariaLabel,
  tooltipContent,
  iconName = 'info',
}: TooltipProps) => (
  <Popup
    popupType="tooltip"
    ariaLabel={ariaLabel}
    popupContent={tooltipContent}
  >
    <Icon iconName={iconName} size="1em" />
  </Popup>
);

export default Tooltip;
