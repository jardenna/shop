import { FC } from 'react';
import Button from '../components/Button';
import TableSearchInput from '../components/table/TableSearchInput';
import VisuallyHidden from '../components/VisuallyHidden';
import useLanguage from '../features/language/useLanguage';
import { BtnVariant } from '../types/enums';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort from './use-table-sort-hook';

// Define table data type
type TableData = {
  username: string;
  email: string;
  role: string;
};

// Define table props interface
interface TableProps {
  data?: TableData[];
  isLoading?: boolean;
}

const tableHeaders = ['username', 'email', 'role', ''];

// Sample data (replace with your actual data source)
const defaultData: TableData[] = [
  { username: 'Helle B', email: 'helle@mail.com', role: 'admin' },
  { username: 'Ole', email: 'ole@mail.com', role: 'user' },
  { username: 'Steen Larsen', email: 'steen@mail.com', role: 'user' },
  { username: 'Helene', email: 'helene@mail.com', role: 'employee' },
];

const initState: TableData = {
  username: '',
  email: '',
  role: '',
};

const Table: FC<TableProps> = ({ isLoading, data = defaultData }) => {
  const { language } = useLanguage();

  const {
    handleSort,
    sortData,
    resetSort,
    getSortIcon,
    getColumnSortDirection,
  } = useTableSort<TableData>({
    sortKey: 'username',
    direction: 'asc',
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
    const filteredData = filterData(data);
    return sortData(filteredData);
  };

  // Clear all filters and sorting
  const clearAll = () => {
    resetFilter();
    resetSort();
  };

  const changedTableData = getChangedTableData();

  return (
    <div className="table-container">
      <div className="table-controls">
        <div className="search-container">
          <input
            type="text"
            placeholder={language.search || 'Search...'}
            value={value}
            onChange={onSearchChange}
            aria-label={language.searchAriaLabel || 'Search in table'}
            className="search-input"
          />
        </div>
        <button
          type="button"
          onClick={clearAll}
          className="clear-filters-btn"
          aria-label={language.clearFilters || 'Clear all filters'}
        >
          {language.clearFilters || 'Clear Filters'}
        </button>
      </div>
      <div className="fixed-table">
        <table aria-label={isLoading ? language.loading : undefined}>
          <thead>
            <tr>
              {tableHeaders.map((tableHeader) => (
                <th
                  scope="col"
                  key={tableHeader}
                  onClick={() => {
                    handleSort(tableHeader as keyof TableData);
                  }}
                  className="sortable-header"
                >
                  <Button variant={BtnVariant.Ghost}>
                    <span>{language[tableHeader]}</span>
                    <VisuallyHidden>
                      {language.sort} {language[tableHeader]}{' '}
                      {language[getColumnSortDirection(tableHeader) || '']}
                    </VisuallyHidden>
                    <span className="sort-icon" aria-hidden>
                      {getSortIcon(tableHeader)}
                    </span>
                  </Button>
                  <TableSearchInput
                    onFilterRows={onFilterRows}
                    title={tableHeader}
                    value={values[tableHeader as keyof TableData]}
                    label={tableHeader}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {changedTableData.length > 0 ? (
              changedTableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                </tr>
              ))
            ) : (
              <tr className="no-results">
                <td colSpan={3}>{language.noResults || 'No results found'}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
