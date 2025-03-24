import VisuallyHidden from '../components/VisuallyHidden';
import useLanguage from '../features/language/useLanguage';
import './_table.scss';
import useTableFilter from './use-table-filter-hook';
import useTableSort, { SortingState } from './use-table-sort-hook';
import UserTableHeaderCell from './UserTableHeaderCell';

// Define generic table data type
type TableData<T> = T;

// Define table props interface
interface TableProps<T> {
  initialFilterState: TableData<any>;
  tableCaption: string;
  tableData: TableData<T>[];
  tableHeaders: (keyof T | '')[];
  initialSortedRow?: SortingState;
  isLoading?: boolean;
}

const Table = <T extends Record<string, any>>({
  tableCaption,
  isLoading,
  tableData,
  tableHeaders,
  initialSortedRow,
  initialFilterState,
}: TableProps<T>) => {
  const { language } = useLanguage();

  const {
    handleSort,
    sortData,
    resetSort,
    getSortIcon,
    getColumnSortDirection,
  } = useTableSort<T>({
    initialSortedRow,
  });

  const {
    value,
    values,
    onSearchChange,
    filterData,
    resetFilter,
    onFilterRows,
  } = useTableFilter<T>({
    filterKeys: tableHeaders as string[],
    initialColumnFilters: initialFilterState,
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
              {tableHeaders.map((header) => (
                <th scope="col" key={String(header)}>
                  <UserTableHeaderCell
                    icon={getSortIcon(String(header))}
                    ariaLabel={`${language.sort} ${getColumnSortDirection(String(header)) ? language[getColumnSortDirection(String(header)) as string] : ''}`}
                    showClearAllBtn={header !== ''}
                    onSortRows={() => {
                      handleSort(String(header));
                    }}
                    title={String(header)}
                    value={values[header] as string}
                    label={language[String(header)]}
                    onFilterRows={onFilterRows}
                  />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {changedTableData.length > 0 ? (
              changedTableData.map((row, idx) => (
                <tr key={idx}>
                  {tableHeaders.map((header) => (
                    <td key={String(header)}>
                      {header !== '' ? row[header] : <div>ss</div>}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr className="no-results">
                <td colSpan={tableHeaders.length}>{language.noData}</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Table;
