import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';

type TableGridList = {
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
    <div className="table-grid-icons">
      {tableGridIconList.map(({ padding, iconName, title }) => (
        <IconBtn
          key={padding}
          iconName={iconName}
          title={language[title]}
          ariaLabel={language[title]}
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
