import { FC } from 'react';
import Dropdown from '../../../../../components/dropdown/Dropdown';
import Input from '../../../../../components/formElements/Input';
import Icon from '../../../../../components/icons/Icon';
import TableGridList from '../../../../../components/TableGridList';
import VisuallyHidden from '../../../../../components/VisuallyHidden';
import useLocalStorage from '../../../../../hooks/useLocalStorage';
import { BtnVariant, IconName } from '../../../../../types/enums';
import useLanguage from '../../../../language/useLanguage';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort, { SortingState } from './use-table-sort-hook';
import UserTableHeaderCell from './UserTableHeaderCell';

// Define table data type
type TableData = {
  username: string;
  email: string;
  role: string;
  id: string;
};

interface TableProps {
  tableCaption: string;
  tableData: TableData[];
  tableHeaders: string[];
  initialSortedRow?: SortingState;
  isLoading?: boolean;
  onDeleteUser: (id: string, username: string) => void;
}

const initState = {
  username: '',
  email: '',
  role: '',
  id: '',
};

const Table: FC<TableProps> = ({
  tableCaption,
  isLoading,
  tableData,
  tableHeaders,
  initialSortedRow,
  onDeleteUser,
}) => {
  const { language } = useLanguage();

  const {
    handleSort,
    sortData,
    resetSort,
    getSortIcon,
    getColumnSortDirection,
  } = useTableSort<TableData>({
    initialSortedRow,
  });

  const {
    value,
    values,
    onSearchChange,
    filterData,
    resetFilter,
    onFilterRows,
  } = useTableFilter<TableData>({
    filterKeys: tableHeaders,
    initialColumnFilters: initState,
  });

  const getChangedTableData = () => {
    // First filter, then sort
    const filteredData = filterData(tableData);
    return sortData(filteredData);
  };
  const [padding, setPadding] = useLocalStorage('padding', 12);
  const tableGridIconList = [
    { padding: 4, iconName: IconName.GridSmall, title: language.gridSmall },
    { padding: 12, iconName: IconName.Grid, title: language.grid },
    { padding: 20, iconName: IconName.GridLarge, title: language.gridLarge },
  ];

  const changedTableData = getChangedTableData();

  return (
    <>
      <Input
        type="search"
        placeholder={language.search}
        value={value}
        onChange={onSearchChange}
        id="search"
        labelText={language.search}
        name="search"
        inputHasNoLabel
      />

      <div className="table-controls">
        <div className="clear-btns">
          <button
            type="button"
            className="clear-filters-btn"
            onClick={resetSort}
          >
            {language.clearSort}
          </button>
          <button
            type="button"
            className="clear-filters-btn"
            onClick={resetFilter}
          >
            {language.clearFilters}
          </button>
        </div>
        <TableGridList
          onSetPadding={setPadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>
      <div className="fixed-table">
        <table aria-label={isLoading ? language.loading : undefined}>
          <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
          <thead>
            <tr>
              {tableHeaders.map((tableHeader) => (
                <th
                  scope="col"
                  key={tableHeader}
                  style={{ paddingTop: padding, paddingBottom: padding }}
                >
                  <UserTableHeaderCell
                    icon={getSortIcon(tableHeader)}
                    ariaLabel={`${language.sort} ${getColumnSortDirection(tableHeader) ? language[getColumnSortDirection(tableHeader) as string] : ''}`}
                    showClearAllBtn={tableHeader !== ''}
                    onSortRows={() => {
                      handleSort(tableHeader as keyof TableData);
                    }}
                    title={tableHeader}
                    value={values[tableHeader as keyof TableData]}
                    label={language[tableHeader]}
                    onFilterRows={onFilterRows}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {changedTableData.length > 0 ? (
              changedTableData.map(({ id, email, username, role }) => (
                <tr key={email}>
                  <td style={{ paddingTop: padding, paddingBottom: padding }}>
                    {username}
                  </td>
                  <td>
                    <a href={`mailto:${email}`}>{email}</a>
                  </td>
                  <td>
                    <span className="user-role">{role}</span>
                  </td>
                  <td>
                    <div>
                      {role !== 'admin' && (
                        <Dropdown
                          ariaControls="delete-user"
                          text={`${language.sureToDelete} ${username}?`}
                          btnVariant={BtnVariant.Ghost}
                          onPrimaryClick={() => {
                            onDeleteUser(id, username);
                          }}
                          primaryBtnLabel={language.delete}
                          primaryBtnClassName="danger"
                          ariaLabel={language.deleteCustomer}
                          className="danger"
                        >
                          <Icon
                            iconName={IconName.Trash}
                            title={language.trashCan}
                            ariaLabel={language.deleteCustomer}
                          />
                        </Dropdown>
                      )}
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr className="no-results">
                <td colSpan={3}>{language.noData}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
