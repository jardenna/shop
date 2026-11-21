import type { IconNameValue } from '../shared/types';
import IconBtn from './IconBtn';

export interface DisplayControlItem {
  ariaLabel: string;
  display: string;
  iconName: IconNameValue;
}

interface DisplayControlsProps {
  activeDisplay: string;
  displayControlList: DisplayControlItem[];
  onSetDisplay: (id: string) => void;
}

const DisplayControls = ({
  displayControlList,
  onSetDisplay,
  activeDisplay,
}: DisplayControlsProps) => (
  <ul className="display-controls">
    {displayControlList.map(({ display, iconName, ariaLabel }) => (
      <li key={display}>
        <IconBtn
          iconName={iconName}
          ariaLabel={ariaLabel}
          onClick={() => {
            onSetDisplay(display);
          }}
          disabled={activeDisplay === display}
        />
      </li>
    ))}
  </ul>
);

export default DisplayControls;
