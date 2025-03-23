import { FC } from 'react';
import Button from '../components/Button';
import TableSearchInput from '../components/table/TableSearchInput';
import { BtnVariant } from '../types/enums';
import { ChangeInputType } from '../types/types';

interface UserTableHeaderCellProps {
  ariaLabel: string;
  icon: string;
  label: string;
  showClearAllBtn: boolean;
  title: string;
  value: string;
  onFilterRows: (event: ChangeInputType) => void;
  onSortRows: () => void;
}

const UserTableHeaderCell: FC<UserTableHeaderCellProps> = ({
  ariaLabel,
  icon,
  label,
  onFilterRows,
  onSortRows,
  showClearAllBtn,
  title,
  value,
}) => (
  <section className="table-header-cell">
    {showClearAllBtn ? (
      <>
        <Button
          variant={BtnVariant.Ghost}
          onClick={onSortRows}
          ariaLabel={ariaLabel}
        >
          <span className="sort-icon" aria-hidden>
            {icon}
          </span>
        </Button>
        <TableSearchInput
          onFilterRows={onFilterRows}
          title={title}
          value={value}
          label={label}
        />
      </>
    ) : (
      <span>e</span>
      // <IconBtn
      //   iconName={IconName.Undo}
      //   title={language.reset}
      //   ariaLabel={language.resetFiltersAndSorting}
      //   onClick={onClearAllValues}
      // />
    )}
  </section>
);

export default UserTableHeaderCell;
