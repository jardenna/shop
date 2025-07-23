import useLanguage from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import IconBtn from './IconBtn';

type DisplayControls = {
  ariaLabel: string;
  iconName: IconName;
  padding: string;
  title: string;
};

type DisplayControlsProps = {
  isActive: string;
  tableGridIconList: DisplayControls[];
  onSetPadding: (id: string) => void;
};

const DisplayControls = ({
  tableGridIconList,
  onSetPadding,
  isActive,
}: DisplayControlsProps) => {
  const { language } = useLanguage();
  return (
    <div className="display-controls" aria-label={language.displayDensity}>
      {tableGridIconList.map(({ padding, iconName, title, ariaLabel }) => (
        <IconBtn
          key={padding}
          iconName={iconName}
          title={language[title]}
          ariaLabel={ariaLabel}
          onClick={() => {
            onSetPadding(padding);
          }}
          disabled={isActive === padding}
          ariaSelected={isActive === padding}
        />
      ))}
    </div>
  );
};

export default DisplayControls;
