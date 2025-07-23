import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';

type TableGridList = {
  ariaLabel: string;
  iconName: IconName;
  padding: string;
  title: string;
};

type TableGridIconListProps = {
  isActive: string;
  tableGridIconList: TableGridList[];
  onSetPadding: (id: string) => void;
};

const TableGridList = ({
  tableGridIconList,
  onSetPadding,
  isActive,
}: TableGridIconListProps) => {
  const { language } = useLanguage();
  return (
    <div className="table-grid-icons" aria-label={language.displayDensity}>
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

export default TableGridList;
