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
    {showClearAllBtn && (
      <>
        <div className="sort">
          <span>{label}</span>
          <Button
            variant={BtnVariant.Ghost}
            onClick={onSortRows}
            ariaLabel={ariaLabel}
          >
            <span className="sort-icon" aria-hidden>
              {icon}
            </span>
          </Button>
        </div>
        <TableSearchInput
          onFilterRows={onFilterRows}
          title={title}
          value={value}
          label={label}
        />
      </>
    )}
  </section>
);

export default UserTableHeaderCell;
