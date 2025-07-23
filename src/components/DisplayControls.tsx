import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

type DisplayControls = {
  ariaLabel: string;
  display: string;
  iconName: IconName;
  title: string;
};

type DisplayControlsProps = {
  ariaLabel: string;
  displayControlList: DisplayControls[];
  isActive: string;
  onSetDisplay: (id: string) => void;
};

const DisplayControls = ({
  displayControlList,
  onSetDisplay,
  isActive,
  ariaLabel,
}: DisplayControlsProps) => (
  <div className="display-controls" aria-label={ariaLabel}>
    {displayControlList.map(({ display, iconName, title, ariaLabel }) => (
      <IconBtn
        key={display}
        iconName={iconName}
        title={title}
        ariaLabel={ariaLabel}
        onClick={() => {
          onSetDisplay(display);
        }}
        disabled={isActive === display}
        ariaSelected={isActive === display}
      />
    ))}
  </div>
);

export default DisplayControls;
