import { FC } from 'react';
import IconBtn from '../../../../components/IconBtn';
import { IconName } from '../../../../types/enums';
import { ChangeInputType, DirectionType } from '../../../../types/types';
import useLanguage from '../../../language/useLanguage';
import SearchField from './SearchField';

type SortProps = {
  direction: DirectionType;
  keyToSort: string;
};

type Values = {
  email: string;
  role: string;
  username: string;
};

interface TableHeaderCellProps {
  label: string;
  sort: SortProps;
  sortKey: string | null;
  values: Values;
  onClearAll: () => void;
  onFilterRows: (event: ChangeInputType) => void;
  onSortRows: (sortKey: string) => void;
}

const TableHeaderCell: FC<TableHeaderCellProps> = ({
  sortKey,
  label,
  onClearAll,
  onSortRows,
  onFilterRows,
  sort,
  values,
}) => {
  const { language } = useLanguage();

  const sortInfo = sort.direction === 'asc' && sort.keyToSort === sortKey;

  return (
    <section className="table-header-cell">
      <div className="sort">
        {label}
        {sortKey && (
          <IconBtn
            onClick={() => {
              onSortRows(sortKey);
            }}
            ariaLabel={`${language.sort} ${label} ${sortInfo ? language.ascending : language.descending}`}
            iconName={sortInfo ? IconName.ArrowUp : IconName.ArrowDown}
            title={language.sort}
          />
        )}
      </div>

      {sortKey && (
        <SearchField
          onFilterRows={onFilterRows}
          title={sortKey}
          value={values[sortKey as keyof typeof values]}
          label={label}
        />
      )}
      {!sortKey && (
        <IconBtn
          iconName={IconName.Undo}
          title={language.reset}
          ariaLabel={language.resetFiltersAndSorting}
          onClick={onClearAll}
        />
      )}
    </section>
  );
};

export default TableHeaderCell;
