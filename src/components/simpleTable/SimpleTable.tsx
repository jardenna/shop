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
  getRowKey: (rowData: RowData) => string;
  renderCells: (rowData: RowData) => ReactNode;
}

const SimpleTable = <RowData,>({
  tableHeaderList,
  tableDataList,
  renderCells,
  getRowKey,
  tableCaption,
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
        </tr>
      </thead>

      <tbody>
        {tableDataList.map((rowData) => (
          <tr key={getRowKey(rowData)}>{renderCells(rowData)}</tr>
        ))}
      </tbody>
    </table>
  );
};

export default SimpleTable;
