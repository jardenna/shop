import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

type DisplayControls = {
  ariaLabel: string;
  display: string;
  iconName: IconName;
};

type DisplayControlsProps = {
  displayControlList: DisplayControls[];
  isActive: string;
  onSetDisplay: (id: string) => void;
};

const DisplayControls = ({
  displayControlList,
  onSetDisplay,
  isActive,
}: DisplayControlsProps) => (
  <div className="display-controls">
    {displayControlList.map(({ display, iconName, ariaLabel }) => (
      <IconBtn
        key={display}
        iconName={iconName}
        ariaLabel={ariaLabel}
        onClick={() => {
          onSetDisplay(display);
        }}
        disabled={isActive === display}
      />
    ))}
  </div>
);

export default DisplayControls;
