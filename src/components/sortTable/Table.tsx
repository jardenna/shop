import { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router';
import useLanguage from '../../features/language/useLanguage';
import useLocalStorage, { localStorageKeys } from '../../hooks/useLocalStorage';
import variables from '../../scss/variables.module.scss';
import { BtnVariant, IconName } from '../../types/enums';
import { SortOrderType } from '../../types/types';
import Button from '../Button';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import SkeletonList from '../skeleton/SkeletonList';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import TableGridList from './TableGridList';
import TableSearchInput from './TableSearchInput';

export type Column<T> = {
  key: keyof T;
  label: string;
  name: string;
  hideTableControls?: boolean;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  tableCaption: string;
  emptyHeaderCellText?: string;
  children: (sortedData: T[]) => ReactNode;
  onReset: () => void;
};

const Table = <T,>({
  data,
  columns,
  children,
  tableCaption,
  isLoading,
  emptyHeaderCellText,
  onReset,
}: TableProps<T>) => {
  const { language } = useLanguage();
  const [searchParams, setSearchParams] = useSearchParams();
  const { paddingBlockSmall, paddingBlockMedium, paddingBlockLarge } =
    variables;
  const [padding, setPadding] = useLocalStorage(
    localStorageKeys.tableCellPadding,
    paddingBlockMedium,
  );

  const tableGridIconList = [
    {
      padding: paddingBlockSmall,
      iconName: IconName.GridSmall,
      title: language.gridSmall,
    },
    {
      padding: paddingBlockMedium,
      iconName: IconName.Grid,
      title: language.grid,
    },
    {
      padding: paddingBlockLarge,
      iconName: IconName.GridLarge,
      title: language.gridLarge,
    },
  ];

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
    const newOrder: SortOrderType =
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
  const ariaSort = sortOrder !== 'asc' ? 'descending' : 'ascending';
  const ariaLabel = sortOrder !== 'asc' ? language.desc : language.asc;

  return (
    <>
      <div className="table-controls">
        <Button onClick={handleClearAll} variant={BtnVariant.Default}>
          {language.clearFilters}
        </Button>
        <TableGridList
          onSetPadding={setPadding}
          tableGridIconList={tableGridIconList}
          isActive={padding}
        />
      </div>
      <div className="fixed-table">
        {isLoading ? (
          <SkeletonList count={6} className="column" height="2.75" />
        ) : (
          <ErrorBoundary
            FallbackComponent={ErrorBoundaryFallback}
            onReset={() => onReset}
          >
            <table>
              <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>
              <thead>
                <tr>
                  {columns.map((col) => (
                    <th
                      key={col.key as string}
                      scope="col"
                      style={{ paddingBlock: Number(padding) }}
                      aria-sort={sortField === col.name ? ariaSort : 'none'}
                    >
                      {col.name !== '' ? (
                        <div className="table-header-cell">
                          {!col.hideTableControls && (
                            <Button
                              variant={BtnVariant.Ghost}
                              onClick={() => {
                                handleSort(col.key);
                              }}
                              ariaLabel={
                                sortField === col.name
                                  ? `${language.sort} ${language[col.name]} ${ariaLabel}`
                                  : `${language.sort} ${language[col.name]}`
                              }
                            >
                              {language[col.label]}
                              <span className="sort-icon" aria-hidden>
                                {sortField === col.name ? sortIcon : '⇅'}
                              </span>
                            </Button>
                          )}

                          {!col.hideTableControls && (
                            <TableSearchInput
                              onFilterRows={(e) => {
                                handleFilter(col.key, e.target.value);
                              }}
                              title={col.label}
                              value={filters[col.key]}
                              label={language[col.label]}
                            />
                          )}
                        </div>
                      ) : (
                        <VisuallyHidden as="p">
                          {emptyHeaderCellText}
                        </VisuallyHidden>
                      )}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className={`padding-${padding}`}>
                {data.length ? (
                  children(sortedData)
                ) : (
                  <tr>
                    <td colSpan={columns.length}>{language.noData}</td>
                  </tr>
                )}
              </tbody>
            </table>
          </ErrorBoundary>
        )}
      </div>
    </>
  );
};

export default Table;
