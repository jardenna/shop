import { FC } from 'react';
import useLanguage from '../features/language/useLanguage';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort from './use-table-sort-hook';

// Define table data type
type TableData = {
  name: string;
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
  { name: 'Helle B', email: 'helle@mail.com', role: 'admin' },
  { name: 'Ole', email: 'ole@mail.com', role: 'user' },
  { name: 'Steen Larsen', email: 'steen@mail.com', role: 'user' },
  { name: 'Helene', email: 'helene@mail.com', role: 'employee' },
];

const Table: FC<TableProps> = ({ isLoading, data = defaultData }) => {
  const { language } = useLanguage();

  // Use custom sort hook
  const { handleSort, sortData, resetSort, getSortIcon } = useTableSort<
    TableData,
    ColumnKey
  >({ sortKey: 'name', direction: 'asc' });

  // Use custom filter hook
  const { value, onSearchChange, filterData, resetFilter } =
    useTableFilter<TableData>('', ['name', 'email', 'role']);

  // Process data through both hooks
  const getProcessedData = () => {
    // First filter, then sort
    const filteredData = filterData(data);
    return sortData(filteredData);
  };

  // Clear all filters and sorting
  const clearAll = () => {
    resetFilter();
    resetSort();
  };

  const processedData = getProcessedData();

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
                  handleSort('name');
                }}
                className="sortable-header"
              >
                {language.name || 'Name'}{' '}
                <span className="sort-icon">{getSortIcon('name')}</span>
              </th>
              <th
                onClick={() => {
                  handleSort('email');
                }}
                className="sortable-header"
              >
                {language.email || 'Email'}{' '}
                <span className="sort-icon">{getSortIcon('email')}</span>
              </th>
              <th
                onClick={() => {
                  handleSort('role');
                }}
                className="sortable-header"
              >
                {language.role || 'Role'}{' '}
                <span className="sort-icon">{getSortIcon('role')}</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {processedData.length > 0 ? (
              processedData.map((row, index) => (
                <tr key={index}>
                  <td>{row.name}</td>
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
