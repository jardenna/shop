import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

type DisplayControls = {
  ariaLabel: string;
  display: string;
  iconName: IconName;
};

type DisplayControlsProps = {
  activeDisplay: string;
  displayControlList: DisplayControls[];
  onSetDisplay: (id: string) => void;
};

const DisplayControls = ({
  displayControlList,
  onSetDisplay,
  activeDisplay,
}: DisplayControlsProps) => {
  const { language } = useLanguage();

  return (
    <div className="display-controls">
      {displayControlList.map(({ display, iconName, ariaLabel }) => (
        <IconBtn
          key={display}
          iconName={iconName}
          ariaLabel={language[ariaLabel]}
          onClick={() => {
            onSetDisplay(display);
          }}
          disabled={activeDisplay === display}
        />
      ))}
    </div>
  );
};

export default DisplayControls;
