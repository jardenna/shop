import DashboardGoalTable from '../features/dashboardGoals/components/DashboardGoalTable';
import { useGetDashboardGoalsQuery } from '../features/dashboardGoals/dashboardGoalsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  const { data: dashboard } = useGetDashboardGoalsQuery();

  return (
    <AdminPageContainer
      heading={language.kpiGoals}
      variant="medium"
      hideBreadCrumbs
    >
      <div>{language.goalSettingsDescription}</div>
      {dashboard && <DashboardGoalTable dashboard={dashboard} />}

      <section>
        <h2>{language.howItWorks}</h2>
        <div>
          <ul>
            <li>{language.kpiGoalsInfo1}</li>
            <li>{language.kpiGoalsInfo2}</li>
            <li>{language.kpiGoalsInfo3}</li>
            <li>{language.kpiGoalsInfo4}</li>
          </ul>
        </div>
      </section>
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
