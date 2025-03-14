import { FC } from 'react';
import './_table.scss';

interface TableProps {
  columns: string[];
  data: (string | number)[][];
}

const FixedTable: FC<TableProps> = ({ columns, data }) => (
  <div className="table-container">
    <table className="fixed-table">
      <thead>
        <tr>
          {columns.map((col, index) => (
            <th key={index} className={index === 0 ? 'sticky-col' : ''}>
              {col}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, rowIndex) => (
          <tr key={rowIndex}>
            {row.map((cell, cellIndex) => (
              <td
                key={cellIndex}
                className={cellIndex === 0 ? 'sticky-col' : ''}
              >
                {cell}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default FixedTable;
