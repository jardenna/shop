import SimpleTable from '../components/simpleTable/SimpleTable';
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
            <>
              <td>
                <div>{language[kpi.key]}</div>
                {language[kpi.description]}
              </td>
              {dashboard.tableHeaders.map(({ id, days }) => (
                <td key={id}>{dashboard.goals[kpi.key][days]}</td>
              ))}
            </>
          )}
        />
      )}
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
