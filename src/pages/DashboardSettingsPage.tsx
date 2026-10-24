import KpiTargetTable from '../features/kpiTarget/KpiTargetTable';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

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
