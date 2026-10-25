import KpiTargetTable from '../features/dashboardGoals/components/KpiTargetTable';
import { useGetDashboardGoalsQuery } from '../features/dashboardGoals/dashboardGoalsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  const { data: dashboard } = useGetDashboardGoalsQuery();
  console.log(dashboard?.goals);

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
