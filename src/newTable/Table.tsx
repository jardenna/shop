import { FC } from 'react';
import VisuallyHidden from '../components/VisuallyHidden';
import useLanguage from '../features/language/useLanguage';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort, { SortingState } from './use-table-sort-hook';
import UserTableHeaderCell from './UserTableHeaderCell';

// Define table data type
type TableData = {
  username: string;
  email: string;
  role: string;
};

// Define table props interface
interface TableProps {
  tableCaption: string;
  tableData: TableData[];
  tableHeaders: string[];
  initialSortedRow?: SortingState;
  isLoading?: boolean;
}

const initState: TableData = {
  username: '',
  email: '',
  role: '',
};

const Table: FC<TableProps> = ({
  tableCaption,
  isLoading,
  tableData,
  tableHeaders,
  initialSortedRow,
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

  // Clear all filters and sorting
  const clearAll = () => {
    resetFilter();
    resetSort();
  };

  const changedTableData = getChangedTableData();

  return (
    <>
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
          <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
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
              changedTableData.map((row, index) => (
                <tr key={index}>
                  <td>{row.username}</td>
                  <td>{row.email}</td>
                  <td>{row.role}</td>
                  <td>span</td>
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
    </>
  );
};

export default Table;
