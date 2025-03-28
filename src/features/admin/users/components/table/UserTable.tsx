import { FC } from 'react';
import Dropdown from '../../../../../components/dropdown/Dropdown';
import Input from '../../../../../components/formElements/Input';
import Icon from '../../../../../components/icons/Icon';
import Table from '../../../../../components/table/Table';
import { BtnVariant, IconName } from '../../../../../types/enums';
import useLanguage from '../../../../language/useLanguage';
import UserTableHeaderCell from './UserTableHeaderCell';
import useTableFilter from './useTableFilter';
import useTableSort, { SortingState } from './useTableSort';

type TableData = {
  email: string;
  id: string;
  role: string;
  username: string;
};

interface UsersTableProps {
  isLoading: boolean;
  tableCaption: string;
  tableData: TableData[];
  tableHeaders: string[];
  initialSortedRow?: SortingState;
  onDeleteUser: (id: string, username: string) => void;
}

const initState = {
  username: '',
  email: '',
  role: '',
  id: '',
};

const UsersTable: FC<UsersTableProps> = ({
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
      </div>
      <Table isLoading={isLoading} tableCaption={tableCaption}>
        <thead>
          <tr>
            {tableHeaders.map((tableHeader) => (
              <th scope="col" key={tableHeader}>
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
                <td>{username}</td>
                <td>
                  <a href={`mailto:${email}`}>{email}</a>
                </td>
                <td>
                  <span className="user-role">{role}</span>
                </td>
                <td>
                  <div>
                    {role !== 'Admin' && (
                      <Dropdown
                        ariaControls="delete-user"
                        text={`${language.sureToDelete} ${username}?`}
                        btnVariant={BtnVariant.Ghost}
                        onPrimaryClick={() => {
                          onDeleteUser(id, username);
                        }}
                        primaryBtnLabel={language.delete}
                        primaryBtnClassName="danger"
                        ariaLabel={language.deleteUser}
                        className="danger"
                      >
                        <Icon
                          iconName={IconName.Trash}
                          title={language.trashCan}
                          ariaLabel={language.deleteUser}
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
      </Table>
    </>
  );
};

export default UsersTable;
