import type { ReactNode } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import VisuallyHidden from '../VisuallyHidden';
import './_simple-table.scss';

interface TableHeaderItem {
  label: string;
}

interface SimpleTableProps<RowData> {
  tableCaption: string;
  tableDataList: RowData[];
  tableHeaderList: TableHeaderItem[];
  emptyHeaderCellText?: string;
  renderCells: (rowData: RowData) => ReactNode;
  rowKey: (rowData: RowData) => string;
}

const SimpleTable = <RowData,>({
  tableHeaderList,
  tableDataList,
  renderCells,
  rowKey,
  tableCaption,
  emptyHeaderCellText,
}: SimpleTableProps<RowData>) => {
  const { language } = useLanguage();

  return (
    <table className="simple-table">
      <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>

      <thead>
        <tr>
          {tableHeaderList.map(({ label }) => (
            <th key={label} scope="col">
              {language[label]}
            </th>
          ))}

          {emptyHeaderCellText && (
            <th>
              <VisuallyHidden>{emptyHeaderCellText}</VisuallyHidden>
            </th>
          )}
        </tr>
      </thead>

      <tbody>
        {tableDataList.map((rowData) => (
          <tr key={rowKey(rowData)}>{renderCells(rowData)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
