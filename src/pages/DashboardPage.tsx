import { useState } from 'react';
import Selectbox from '../components/selectbox/Selectbox';
import KpiCart from '../features/dashboard/components/KpiCart';
import { kpiOptions } from '../features/dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import { OptionType } from '../types/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedYear, setSelectedYear] = useState('');

  const handleSelectYear = (option: OptionType | null) => {
    setSelectedYear(option?.value ?? '');
  };

  //   new customers revenue orders

  // total customers total revenue total orders
  console.log(selectedYear);

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
          handleSelectYear(option);
        }}
        inputHasNoLabel
        name="year"
        labelText={language.filterByYear}
      />
      <div className="flex">
        <KpiCart title="Total customers" iconName={IconName.Users} />
        <KpiCart title="Total Revenue" iconName={IconName.Revenue} />
        <KpiCart title="Total orders" iconName={IconName.Orders} />
      </div>
      <div className="flex">
        <KpiCart
          title="New customers"
          iconName={IconName.Users}
          progressPercentage={30}
        />
        <KpiCart
          title="Revenue"
          iconName={IconName.Revenue}
          progressPercentage={90}
        />
        <KpiCart
          title="New orders"
          iconName={IconName.Orders}
          progressPercentage={-3}
        />
      </div>
    </AdminPageContainer>
  );
};

export default DashboardPage;
