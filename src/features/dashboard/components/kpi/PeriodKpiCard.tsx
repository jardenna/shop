import type { GoalPeriod } from '../../../../app/api/apiTypes/adminGoalsApiTypes';
import type { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import PopoverBtn from '../../../../components/adminCard/PopoverBtn';
import Icon from '../../../../components/icons/Icon';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import { kpiIcons } from '../../../adminGoals/adminGoalsUtils';
import { useCurrency } from '../../../currency/useCurrency';
import { useLanguage } from '../../../language/useLanguage';
import KpiCardLayout from './KpiCardLayout';
import KpiCardPopup from './KpiCardPopup';

interface PeriodKpiCardProps {
  kpi: PeriodKpiResponse;
  period: GoalPeriod;
}

const PeriodKpiCard = ({ kpi, period }: PeriodKpiCardProps) => {
  const { language } = useLanguage();
  const isRevenue = kpi.key.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(kpi.value);
  const progressPercentage = Math.min((kpi.value / kpi.goal) * 100, 100);

  return (
    <KpiCardLayout
      id={kpi.key}
      iconName={kpiIcons[kpi.key]}
      description={language[kpi.description]}
      title={language[kpi.label]}
      kpiTotal={isRevenue ? convertedPrice : kpi.value}
      className="period-kpi-card"
    >
      <PopoverBtn
        className="kpi-card-popover"
        popupContent={
          <KpiCardPopup period={period} kpi={kpi} language={language} />
        }
        ariaHasPopup="dialog"
        ariaLabel={language.comparisonWithPreviousPeriod}
      >
        <Icon iconName="info" />
      </PopoverBtn>
      <div className="kpi-progress-bar">
        <span className="kpi-progress-info">
          <span>{language.goalProgress}</span>
          <span>{Math.round(progressPercentage)} %</span>
        </span>
        <ProgressBar progressPercentage={progressPercentage} />
      </div>
    </KpiCardLayout>
  );
};
export default PeriodKpiCard;
