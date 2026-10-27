import DashboardKpiTable from '../features/dashboardGoals/components/DashboardKpiTable';
import { useGetDashboardGoalsQuery } from '../features/dashboardGoals/dashboardGoalsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  const { data: dashboard } = useGetDashboardGoalsQuery();

  return (
    <AdminPageContainer
      heading={language.dashboardSettings}
      variant="large"
      hideBreadCrumbs
    >
      {dashboard && <DashboardKpiTable dashboard={dashboard} />}
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
