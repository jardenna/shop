import type { ReactNode } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useSearchParams } from 'react-router';
import { useLanguage } from '../../features/language/useLanguage';
import { localStorageKeys, useLocalStorage } from '../../hooks/useLocalStorage';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import variables from '../../scss/variables.module.scss';
import { BtnVariant, IconName } from '../../types/enums';
import { InputType } from '../../types/types';
import Button from '../Button';
import DisplayControls from '../DisplayControls';
import ErrorBoundaryFallback from '../ErrorBoundaryFallback';
import SkeletonList from '../skeleton/SkeletonList';
import VisuallyHidden from '../VisuallyHidden';
import './_table.scss';
import TableFilterPopup from './tableFilters/TableFilterPopup';
import { createInitialFilters } from './tableFilters/tableFiltersUtils';

export type Column<T> = {
  key: keyof T;
  label: string;
  name: string;
  hideTableControls?: boolean;
  tableFilterType?: InputType;
};

type TableProps<T> = {
  columns: Column<T>[];
  data: T[];
  isLoading: boolean;
  onSort: any;
  sortField: any;
  sortOrder: any;
  tableCaption: string;
  className?: string;
  emptyHeaderCellText?: string;
  children: (data: T[]) => ReactNode;
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
  className,
  onSort,
  sortField,
  sortOrder,
}: TableProps<T>) => {
  const { language } = useLanguage();
  const { paddingBlockSmall, paddingBlockMedium, paddingBlockLarge } =
    variables;

  const [padding, setPadding] = useLocalStorage(
    localStorageKeys.tableCellPadding,
    paddingBlockMedium,
  );

  const tableGridIconList = [
    {
      display: paddingBlockSmall,
      iconName: IconName.GridSmall,
      title: language.gridSmall,
      ariaLabel: language.compact,
    },
    {
      display: paddingBlockMedium,
      iconName: IconName.Grid,
      title: language.grid,
      ariaLabel: language.standard,
    },
    {
      display: paddingBlockLarge,
      iconName: IconName.GridLarge,
      title: language.gridLarge,
      ariaLabel: language.expanded,
    },
  ];

  const initialFilters = createInitialFilters(columns);

  const { values, setValue } = useSearchParamsState(initialFilters);

  const sortIcon = sortOrder === 'asc' ? '↑' : '↓';
  const ariaSort = sortOrder !== 'asc' ? 'descending' : 'ascending';
  const ariaLabel =
    sortOrder !== 'asc' ? language.descending : language.ascending;

  const [, setSearchParams] = useSearchParams();

  const handleClearAllParams = () => {
    setSearchParams('');
  };

  return (
    <>
      <div className="table-controls">
        <Button onClick={handleClearAllParams} variant={BtnVariant.Default}>
          {language.clearFilters}
        </Button>
        <DisplayControls
          onSetDisplay={setPadding}
          displayControlList={tableGridIconList}
          activeDisplay={padding}
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
            <table className={className}>
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
                                onSort(col.key);
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
                            <TableFilterPopup
                              onFilterRows={setValue}
                              id={col.label}
                              name={col.name}
                              value={values[col.key] as string}
                              filterType={col.tableFilterType || 'text'}
                              values={values}
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
                  children(data)
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
