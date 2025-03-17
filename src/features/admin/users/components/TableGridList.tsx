import { FC } from 'react';
import IconBtn from '../../../../components/IconBtn';
import { IconName } from '../../../../types/enums';
import useLanguage from '../../../language/useLanguage';

interface TableGridList {
  iconName: IconName;
  padding: number;
  title: string;
}

interface TableGridIconListProps {
  isActive: number;
  tableGridIconList: TableGridList[];
  onSetPadding: (id: number) => void;
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
