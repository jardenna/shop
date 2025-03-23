import { FC } from 'react';
import useLanguage from '../features/language/useLanguage';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort from './use-table-sort-hook';

// Define table data type
type TableData = {
  username: string;
  email: string;
  role: string;
};

// Define column keys
type ColumnKey = keyof TableData;

// Define table props interface
interface TableProps {
  data?: TableData[];
  isLoading?: boolean;
}

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

  const { handleSort, sortData, resetSort, getSortIcon } = useTableSort<
    TableData,
    ColumnKey
  >({ sortKey: 'username', direction: 'asc' });

  const {
    value,
    values,
    onSearchChange,
    filterData,
    resetFilter,
    handleChange,
  } = useTableFilter<TableData>('', ['username', 'email', 'role'], initState);

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
              <th
                onClick={() => {
                  handleSort('username');
                }}
                className="sortable-header"
              >
                {language.name || 'Name'}{' '}
                <span className="sort-icon">{getSortIcon('username')}</span>
                <input
                  type="search"
                  placeholder={language.search || 'Search...'}
                  value={values.username}
                  onChange={handleChange}
                  aria-label={language.searchAriaLabel || 'Search in table'}
                  id="username"
                  name="username"
                />
              </th>
              <th
                onClick={() => {
                  handleSort('email');
                }}
                className="sortable-header"
              >
                {language.email || 'Email'}{' '}
                <span className="sort-icon">{getSortIcon('email')}</span>
                <input
                  type="search"
                  placeholder={language.search || 'Search...'}
                  value={values.email}
                  onChange={handleChange}
                  aria-label={language.searchAriaLabel || 'Search in table'}
                  id="email"
                  name="email"
                />
              </th>
              <th
                onClick={() => {
                  handleSort('role');
                }}
                className="sortable-header"
              >
                {language.role || 'Role'}{' '}
                <span className="sort-icon">{getSortIcon('role')}</span>
                <input
                  type="search"
                  placeholder={language.search || 'Search...'}
                  value={values.role}
                  onChange={handleChange}
                  aria-label={language.searchAriaLabel || 'Search in table'}
                  id="role"
                  name="role"
                />
              </th>
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
