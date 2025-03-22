import { FC } from 'react';
import useLanguage from '../../features/language/useLanguage';
import { IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';
import IconBtn from '../IconBtn';

interface UserTableHeaderCellProps {
  ariaLabel: string;
  iconName: IconName;
  label: string;
  name: string;
  showClearAllBtn: boolean;
  value: string;
  onClearAllValues: () => void;
  onFilterRows: (event: ChangeInputType) => void;
  onSortRows: () => void;
}

const UserTableHeaderCell: FC<UserTableHeaderCellProps> = ({
  label,
  onClearAllValues,
  onSortRows,
  onFilterRows,
  iconName,
  value,
  ariaLabel,
  name,
  showClearAllBtn,
}) => {
  const { language } = useLanguage();

  return (
    <section className="table-header-cell">
      {!showClearAllBtn && (
        <div>
          <div className="sort">
            {label}

            <IconBtn
              onClick={onSortRows}
              ariaLabel={ariaLabel}
              iconName={iconName}
              title={language.sort}
            />
          </div>

          <form>
            <div className="input-wrapper">
              <input
                type="search"
                placeholder="search"
                onChange={onFilterRows}
                value={value}
                name={name}
                id={name}
              />
            </div>
          </form>
        </div>
      )}

      {showClearAllBtn && (
        <IconBtn
          iconName={IconName.Undo}
          title={language.reset}
          ariaLabel={language.resetFiltersAndSorting}
          onClick={onClearAllValues}
        />
      )}
    </section>
  );
};

export default UserTableHeaderCell;
