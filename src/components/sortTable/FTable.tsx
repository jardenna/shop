import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';

type Column<T> = {
  key: keyof T;
  label: string;
};

type SortableTableProps<T> = {
  data: T[];
  columns: Column<T>[];
  children: (sortedData: T[]) => ReactNode;
};

const SortableTable = <T,>({
  data,
  columns,
  children,
}: SortableTableProps<T>) => {
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField =
    (searchParams.get('sortField') as keyof T) || columns[0]?.key;
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const filters = {} as Record<keyof T, string>;
  for (const col of columns) {
    if (col.key) {
      filters[col.key] = searchParams.get(col.key as string) || '';
    }
  }

  const handleSort = (field: keyof T) => {
    const newOrder =
      sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      sortField: field as string,
      sortOrder: newOrder,
    });
  };

  const handleFilter = (field: keyof T, value: string) => {
    setSearchParams({
      ...Object.fromEntries(searchParams.entries()),
      [field as string]: value,
    });
  };

  const handleClearAll = () => {
    setSearchParams('');
  };

  const filteredData = data.filter((item) =>
    (Object.keys(filters) as (keyof T)[]).every(
      (key) =>
        filters[key] === '' ||
        item[key]
          ?.toString()
          .toLowerCase()
          .includes(filters[key].toLowerCase()),
    ),
  );

  const sortedData = [...filteredData].sort((a, b) => {
    if (a[sortField] < b[sortField]) {
      return sortOrder === 'asc' ? -1 : 1;
    }
    if (a[sortField] > b[sortField]) {
      return sortOrder === 'asc' ? 1 : -1;
    }
    return 0;
  });

  return (
    <div>
      <button onClick={handleClearAll} type="button">
        Clear
      </button>
      <table>
        <thead>
          <tr>
            {columns.map((col) => (
              <th key={col.key as string}>
                {col.label !== '' && (
                  <>
                    <button
                      type="button"
                      onClick={() => {
                        handleSort(col.key);
                      }}
                    >
                      {col.label}
                    </button>
                    <input
                      type="text"
                      value={filters[col.key]}
                      onChange={(e) => {
                        handleFilter(col.key, e.target.value);
                      }}
                      placeholder={`Filter by ${col.label}`}
                    />
                  </>
                )}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>{children(sortedData)}</tbody>
      </table>
    </div>
  );
};

export default SortableTable;
