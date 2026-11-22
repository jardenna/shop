import type { GoalPeriod } from '../../../../app/api/apiTypes/adminGoalsApiTypes';
import type {
  PeriodKpiResponse,
  TotalKpiResponse,
} from '../../../../app/api/apiTypes/dashboardApiTypes';
import { kpiIcons } from '../../../adminGoals/adminGoalsUtils';
import { useLanguage } from '../../../language/useLanguage';
import KpiCard from './KpiCard';
import PeriodKpiCard from './PeriodKpiCard';
import './_kpi.scss';

interface KpiCardListProps {
  periodKpi: PeriodKpiResponse[];
  selectedPeriod: GoalPeriod;
  totalKpi: TotalKpiResponse[];
}

const KpiCardList = ({
  totalKpi,
  periodKpi,
  selectedPeriod,
}: KpiCardListProps) => {
  const { language } = useLanguage();

  return (
    <div className="kpi-card-list">
      {totalKpi.map((kpi) => (
        <KpiCard
          key={kpi.key}
          id={kpi.key}
          title={language[kpi.label]}
          iconName={kpiIcons[kpi.key]}
          description={language[kpi.description]}
          chartData={kpi.chartData}
          total={kpi.total}
        />
      ))}
      {periodKpi.map((kpi) => (
        <PeriodKpiCard key={kpi.key} kpi={kpi} period={selectedPeriod} />
      ))}
    </div>
  );
};

export default KpiCardList;
