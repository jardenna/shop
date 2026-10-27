import type { ReactNode } from 'react';
import { useLanguage } from '../../features/language/useLanguage';
import VisuallyHidden from '../VisuallyHidden';
import './_simple-table.scss';

interface TableHeaderItem {
  id: string;
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
    <div className="fixed-table">
      <table className="simple-table">
        <VisuallyHidden as="caption">{tableCaption}</VisuallyHidden>

        <thead>
          <tr>
            {tableHeaderList.map(({ label, id }) => (
              <th key={id} scope="col">
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
    </div>
  );
};

export default SimpleTable;
