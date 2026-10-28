import { useState } from 'react';
import Selectbox from '../components/selectbox/Selectbox';
import { DashboardPeriod } from '../features/dashboard/apiTypes';
import KpiCart from '../features/dashboard/components/KpiCart';
import { data } from '../features/dashboard/data';
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
          {totals.map((a) => (
            <div key={a.key}>{a.key}</div>
          ))}
        </div>
        <div className="flex">
          {periodKpis.map((a) => (
            <div key={a.key}>{a.key}</div>
          ))}
        </div>
        {data.kpis.map((kpi) => (
          <KpiCart
            key={kpi.key}
            title={language[kpi.title]}
            iconName={kpiIcons[kpi.key]}
            description={language[kpi.description]}
            total={kpi.total}
            progressPercentage={
              kpi.value !== undefined && kpi.goal !== undefined && kpi.goal > 0
                ? Math.min((kpi.value / kpi.goal) * 100, 100)
                : undefined
            }
          />
        ))}
      </div>
      {/* <div className="flex">
        <KpiCart title="Total customers" iconName={IconName.Users} />
        <KpiCart title="Total Revenue" iconName={IconName.Wallet} />
        <KpiCart title="Total orders" iconName={IconName.Orders} />
      </div>
      <div className="flex">
        <KpiCart
          title="New customers"
          iconName={IconName.Account}
          progressPercentage={30}
        />
        <KpiCart
          title="Revenue"
          iconName={IconName.Revenue}
          progressPercentage={90}
        />
        <KpiCart
          title="New orders"
          iconName={IconName.NewOrders}
          progressPercentage={40}
        />
      </div> */}
    </AdminPageContainer>
  );
};

export default DashboardPage;
