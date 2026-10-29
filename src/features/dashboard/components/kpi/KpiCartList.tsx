import {
  PeriodKpiResponse,
  TotalKpiResponse,
} from '../../../../app/api/apiTypes/dashboardApiTypes';
import { kpiIcons } from '../../../dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../../../language/useLanguage';
import KpiCart from './KpiCart';
import './_kpi.scss';

interface KpiCartListProps {
  periodKpi: PeriodKpiResponse[];
  totalKpi: TotalKpiResponse[];
}

const KpiCartList = ({ totalKpi, periodKpi }: KpiCartListProps) => {
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
        <KpiCart
          key={kpi.key}
          id={kpi.key}
          title={language[kpi.label]}
          iconName={kpiIcons[kpi.key]}
          description={language[kpi.description]}
          total={kpi.value}
          progressPercentage={Math.min((kpi.value / kpi.goal) * 100, 100)}
          changePercentage={kpi.changePercentage}
        />
      ))}
    </div>
  );
};

export default KpiCartList;
