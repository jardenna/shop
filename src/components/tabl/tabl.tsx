import React, { FC, useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import './_table.scss';

// Define column types for better type safety
type ColumnKey = 'name' | 'email' | 'role';

// Define sort direction type
type SortDirection = 'asc' | 'desc' | null;

// Define table props interface
interface TableProps {
  data?: Array<{
    name: string;
    email: string;
    role: string;
  }>;
  isLoading?: boolean;
}

// Sample data (replace with your actual data source)
const defaultData = [
  { name: 'Helle B', email: 'helle@mail.com', role: 'admin' },
  { name: 'Ole', email: 'ole@mail.com', role: 'user' },
  { name: 'Steen Larsen', email: 'steen@mail.com', role: 'user' },
  { name: 'Helene', email: 'helene@mail.com', role: 'employee' },
];

const Table: FC<TableProps> = ({ isLoading, data = defaultData }) => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  // Initialize state from URL params or defaults
  const [searchTerm, setSearchTerm] = useState<string>(
    searchParams.get('search') || '',
  );
  const [sortConfig, setSortConfig] = useState<{
    key: ColumnKey | null;
    direction: SortDirection;
  }>({
    key: searchParams.get('sortKey') as ColumnKey,
    direction: (searchParams.get('sortDir') as SortDirection) || null,
  });

  // Update URL params when sort or filter changes
  useEffect(() => {
    const params: Record<string, string> = {};

    if (searchTerm) {
      params.search = searchTerm;
    }

    if (sortConfig.key) {
      params.sortKey = sortConfig.key;
      if (sortConfig.direction) {
        params.sortDir = sortConfig.direction;
      }
    }

    setSearchParams(params);
  }, [searchTerm, sortConfig, setSearchParams]);

  // Handle sorting logic
  const handleSort = (key: ColumnKey) => {
    let direction: SortDirection = 'asc';

    if (sortConfig.key === key) {
      if (sortConfig.direction === 'asc') {
        direction = 'desc';
      } else if (sortConfig.direction === 'desc') {
        direction = null;
      }
    }

    setSortConfig({ key, direction });
  };

  // Handle search input change
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  // Clear all filters and sorting
  const clearFilters = () => {
    setSearchTerm('');
    setSortConfig({ key: null, direction: null });
    setSearchParams({});
  };

  // Filter and sort data
  const getProcessedData = () => {
    let processedData = [...data];

    // Apply search filter
    if (searchTerm) {
      const lowercaseSearch = searchTerm.toLowerCase();
      processedData = processedData.filter(
        (item) =>
          item.name.toLowerCase().includes(lowercaseSearch) ||
          item.email.toLowerCase().includes(lowercaseSearch) ||
          item.role.toLowerCase().includes(lowercaseSearch),
      );
    }

    // Apply sorting
    if (sortConfig.key && sortConfig.direction) {
      processedData.sort((a, b) => {
        const aValue = a[sortConfig.key as keyof typeof a];
        const bValue = b[sortConfig.key as keyof typeof b];

        if (aValue < bValue) {
          return sortConfig.direction === 'asc' ? -1 : 1;
        }
        if (aValue > bValue) {
          return sortConfig.direction === 'asc' ? 1 : -1;
        }
        return 0;
      });
    }

    return processedData;
  };

  // Get sort indicator icon
  const getSortIcon = (key: ColumnKey) => {
    if (sortConfig.key !== key) {
      return '⇅';
    }
    if (sortConfig.direction === 'asc') {
      return '↑';
    }
    if (sortConfig.direction === 'desc') {
      return '↓';
    }
    return '⇅';
  };

  const processedData = getProcessedData();

  return (
    <div className="table-container">
      <div className="table-controls">
        <div className="search-container">
          <input
            type="search"
            placeholder={language.search || 'Search...'}
            value={searchTerm}
            onChange={handleSearchChange}
            aria-label={language.searchAriaLabel || 'Search in table'}
            className="search-input"
          />
        </div>
        <button
          type="button"
          onClick={clearFilters}
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
