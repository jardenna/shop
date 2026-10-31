import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import { GoalPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import PopoverBtn from '../../../../components/adminCart/PopoverBtn';
import Icon from '../../../../components/icons/Icon';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import { IconName } from '../../../../types/enums';
import { useCurrency } from '../../../currency/useCurrency';
import { kpiIcons } from '../../../dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../../../language/useLanguage';
import KpiCartLayout from './KpiCartLayout';
import KpiCartPopup from './KpiCartPopup';

interface PeriodKpiCartProps {
  kpi: PeriodKpiResponse;
  period: GoalPeriod;
}

const PeriodKpiCart = ({ kpi, period }: PeriodKpiCartProps) => {
  const { language } = useLanguage();
  const isRevenue = kpi.key.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(kpi.value);
  const progressPercentage = Math.min((kpi.value / kpi.goal) * 100, 100);

  return (
    <KpiCartLayout
      id={kpi.key}
      iconName={kpiIcons[kpi.key]}
      description={language[kpi.description]}
      title={language[kpi.label]}
      kpiTotal={isRevenue ? convertedPrice : kpi.value}
      className="period-kpi-cart"
    >
      <PopoverBtn
        className="kpi-cart-popover"
        popupContent={
          <KpiCartPopup period={period} kpi={kpi} language={language} />
        }
        ariaHasPopup="dialog"
        ariaLabel="noget translate"
      >
        <Icon iconName={IconName.Info} />
      </PopoverBtn>

      <div className="kpi-progress-bar">
        <span className="kpi-progress-info">
          <span>{language.goalProgress}</span>
          <span>{Math.round(progressPercentage)} %</span>
        </span>
        <ProgressBar progressPercentage={progressPercentage} />
      </div>
    </KpiCartLayout>
  );
};
export default PeriodKpiCart;
