import KpiTargetTable from '../features/dashboardGoals/components/KpiTargetTable';
import { useGetDashboardGoalsQuery } from '../features/dashboardGoals/dashboardGoalsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  const { data: dashboard } = useGetDashboardGoalsQuery();
  console.log(dashboard?.goals);

  const tableHeaderList = [
    { label: 'goal7Days' },
    { label: 'goal30Days' },
    { label: 'goal12Months' },
  ];
  console.log(tableHeaderList);

  // goal7Days
  // goal30Days
  // goal12Months

  return (
    <AdminPageContainer
      heading={language.dashboardSettings}
      variant="large"
      hideBreadCrumbs
    >
      <KpiTargetTable />
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
