import { ReactNode } from 'react';
import { useSearchParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant } from '../../types/enums';
import Button from '../Button';
import TableSearchInput from '../table/TableSearchInput';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';

type Column<T> = {
  key: keyof T;
  label: string;
};

type TableProps<T> = {
  data: T[];
  columns: Column<T>[];
  children: (sortedData: T[]) => ReactNode;
  tableCaption: string;
  isLoading: boolean;
};

const Table = <T,>({
  data,
  columns,
  children,
  tableCaption,
  isLoading,
}: TableProps<T>) => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();

  const sortField =
    (searchParams.get('sortField') as keyof T) || columns[0]?.key;
  const sortOrder = searchParams.get('sortOrder') || 'asc';

  const filters: Record<keyof T, string> = columns.reduce(
    (acc: Record<keyof T, string>, col) => ({
      ...acc,
      [col.key]: searchParams.get(col.key as string) || '',
    }),
    {} as Record<keyof T, string>,
  );

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
  const sortIcon = sortOrder === 'asc' ? '↑' : '↓';
  const ariaLabel = sortOrder === 'asc' ? language.desc : language.asc;
  return (
    <div>
      <button onClick={handleClearAll} type="button">
        Clear
      </button>
      <div className="fixed-table">
        <table aria-label={isLoading ? language.loading : undefined}>
          <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
          <thead>
            <tr>
              {columns.map((col) => (
                <th key={col.key as string} scope="col">
                  {col.label !== '' && (
                    <div className="sort">
                      {language[col.label]}
                      <Button
                        variant={BtnVariant.Ghost}
                        onClick={() => {
                          handleSort(col.key);
                        }}
                        ariaLabel={
                          sortField === col.label
                            ? `${language.sort} ${language[col.label]} ${ariaLabel}`
                            : `${language.sort} ${language[col.label]}`
                        }
                      >
                        <span className="sort-icon" aria-hidden>
                          {sortField === col.label ? sortIcon : '⇅'}
                        </span>
                      </Button>

                      <TableSearchInput
                        onFilterRows={(e) => {
                          handleFilter(col.key, e.target.value);
                        }}
                        title={col.label}
                        value={filters[col.key]}
                        label={language[col.label]}
                      />
                    </div>
                  )}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>{children(sortedData)}</tbody>
        </table>
      </div>
    </div>
  );
};

export default Table;
