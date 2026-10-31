import {
  PeriodKpiResponse,
  TotalKpiResponse,
} from '../../../../app/api/apiTypes/dashboardApiTypes';
import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import { kpiIcons } from '../../../dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../../../language/useLanguage';
import KpiCart from './KpiCart';
import PeriodKpiCart from './PeriodKpiCart';
import './_kpi.scss';

interface KpiCartListProps {
  periodKpi: PeriodKpiResponse[];
  selectedPeriod: GoalPeriod;
  totalKpi: TotalKpiResponse[];
}

const KpiCartList = ({
  totalKpi,
  periodKpi,
  selectedPeriod,
}: KpiCartListProps) => {
  const { language } = useLanguage();

  return (
    <div className="kpi-cart-list">
      {totalKpi.map((kpi) => (
        <KpiCart
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
        <PeriodKpiCart key={kpi.key} kpi={kpi} period={selectedPeriod} />
      ))}
    </div>
  );
};

export default KpiCartList;
