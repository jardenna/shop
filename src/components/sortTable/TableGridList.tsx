import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import IconBtn from '../IconBtn';

interface TableGridList {
  iconName: IconName;
  padding: string;
  title: string;
}

interface TableGridIconListProps {
  isActive: string;
  tableGridIconList: TableGridList[];
  onSetPadding: (id: string) => void;
}

const TableGridList: FC<TableGridIconListProps> = ({
  tableGridIconList,
  onSetPadding,
  isActive,
}) => {
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
          className={isActive === padding ? 'is-active' : ''}
          ariaSelected={isActive === padding}
        />
      ))}
    </div>
  );
};

export default TableGridList;
