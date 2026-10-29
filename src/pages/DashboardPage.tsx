import { useState } from 'react';
import Selectbox from '../components/selectbox/Selectbox';
import { DashboardPeriod } from '../features/dashboard/apiTypes';
import KpiCart from '../features/dashboard/components/KpiCart';
import { dataNew } from '../features/dashboard/dataNew';
import {
  kpiIcons,
  kpiOptions,
} from '../features/dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../features/language/useLanguage';
import { OptionType } from '../types/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>(7);

  const handleSelectPeriod = (option: OptionType | null) => {
    if (option) {
      setSelectedPeriod(Number(option.value) as DashboardPeriod);
    }
  };

  const totals = dataNew.totals;
  const periodKpis = dataNew.periods[selectedPeriod];

  //   new customers revenue orders

  // total customers total revenue total orders

  return (
    <AdminPageContainer
      heading={language.dashboard}
      variant="x-large"
      hideBreadCrumbs
    >
      <Selectbox
        id="year"
        variant="secondary"
        defaultValue={kpiOptions[0]}
        options={kpiOptions}
        onChange={(option) => {
          handleSelectPeriod(option);
        }}
        inputHasNoLabel
        name="year"
        labelText={language.filterByYear}
      />
      <div>
        <div className="flex">
          {totals.map((kpi) => (
            <KpiCart
              key={kpi.key}
              title={language[kpi.label]}
              iconName={kpiIcons[kpi.key]}
              description={language[kpi.description]}
              chartData={kpi.chartData}
              total={kpi.total}
            />
          ))}
        </div>
        <div className="flex">
          {periodKpis.map((kpi) => (
            <KpiCart
              key={kpi.key}
              title={language[kpi.label]}
              iconName={kpiIcons[kpi.key]}
              description={language[kpi.description]}
              total={kpi.value}
              progressPercentage={Math.min((kpi.value / kpi.goal) * 100, 100)}
              changePercentage={kpi.changePercentage}
            />
          ))}
        </div>
      </div>
    </AdminPageContainer>
  );
};

export default DashboardPage;
