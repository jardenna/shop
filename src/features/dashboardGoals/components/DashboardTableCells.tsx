import {
  DashboardGoals,
  Kpi,
  TableHeader,
} from '../../../app/api/apiTypes/dashboardApiTypes';
import { useLanguage } from '../../language/useLanguage';

interface DashboardTableCellsProps {
  goals: DashboardGoals;
  kpi: Kpi;
  tableHeaders: TableHeader[];
}

const DashboardTableCells = ({
  kpi,
  goals,
  tableHeaders,
}: DashboardTableCellsProps) => {
  const { language } = useLanguage();

  return (
    <>
      <td>
        <div>{language[kpi.key]}</div>
        {language[kpi.description]}
      </td>
      {tableHeaders.map(({ id, days }) => (
        <td key={id}>{goals[kpi.key][days]}</td>
      ))}
    </>
  );
};

export default DashboardTableCells;
