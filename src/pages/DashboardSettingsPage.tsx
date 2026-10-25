import SimpleTable from '../components/simpleTable/SimpleTable';
import DashboardTableCells from '../features/dashboardGoals/components/DashboardTableCells';
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
      {dashboard && (
        <SimpleTable
          tableCaption={language.kpiGoals}
          tableHeaderList={[
            { id: 'kpi', label: 'kpi' },
            ...dashboard.tableHeaders,
          ]}
          tableDataList={dashboard.kpis}
          rowKey={({ key }) => key}
          renderCells={(kpi) => (
            <DashboardTableCells
              kpi={kpi}
              tableHeaders={dashboard.tableHeaders}
              goals={dashboard.goals}
            />
          )}
        />
      )}
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
