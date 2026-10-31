import { PeriodKpiResponse } from '../../../../app/api/apiTypes/dashboardApiTypes';
import { DashboardPeriod } from '../../../../app/api/apiTypes/dashboardGoalsApiTypes';
import PopoverBtn from '../../../../components/adminCart/PopoverBtn';
import Cart from '../../../../components/carts/Cart';
import Icon from '../../../../components/icons/Icon';
import ProgressBar from '../../../../components/progressbar/ProgressBar';
import { IconName } from '../../../../types/enums';
import { useCurrency } from '../../../currency/useCurrency';
import { kpiIcons } from '../../../dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../../../language/useLanguage';
import { dashboardKpiVariants } from '../../dashboardUtils';
import KpiCartPopup from './KpiCartPopup';
import KpiContent from './KpiContent';

interface KpiCartNewProps {
  kpi: PeriodKpiResponse;
  period: DashboardPeriod;
}

const KpiCartNew = ({ kpi, period }: KpiCartNewProps) => {
  const { language } = useLanguage();
  const isRevenue = kpi.key.toLowerCase().includes('revenue');
  const { convertedPrice } = useCurrency(kpi.value);
  const progressPercentage = Math.min((kpi.value / kpi.goal) * 100, 100);

  return (
    <Cart className={dashboardKpiVariants[kpi.key]}>
      <div className="kpi-cart">
        <KpiContent
          iconName={kpiIcons[kpi.key]}
          description={language[kpi.description]}
          title={language[kpi.label]}
          kpiTotal={isRevenue ? convertedPrice : kpi.value}
          changePercentage={kpi.changePercentage}
        />
        {kpi.key}
        <PopoverBtn
          popupContent={
            <KpiCartPopup period={period} kpi={kpi} language={language} />
          }
          ariaHasPopup="dialog"
          ariaLabel="noget translate"
        >
          <Icon iconName={IconName.Info} />
        </PopoverBtn>
      </div>

      <div className="kpi-progress-bar">
        <span className="kpi-progress-info">
          <span>{language.goalProgress}</span>
          <span>{Math.round(progressPercentage)} % </span>
        </span>
        <ProgressBar progressPercentage={progressPercentage} />
      </div>
    </Cart>
  );
};

export default KpiCartNew;
