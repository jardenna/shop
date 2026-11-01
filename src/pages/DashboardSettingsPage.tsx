import Icon from '../components/icons/Icon';
import DashboardGoalTable from '../features/dashboardGoals/components/DashboardGoalTable';
import { useGetDashboardGoalsQuery } from '../features/dashboardGoals/dashboardGoalsApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
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
      <div>
        <p className="text-bold goal-heading">
          {language.goalSettingsDescription}
        </p>
        <p>{language.goalSettingsPeriodDescription}</p>
      </div>
      {dashboard && <DashboardGoalTable dashboard={dashboard} />}

      <section className="goal-info">
        <h2 className="goal-info-title">
          <Icon iconName={IconName.Info} />
          {language.howItWorks}
        </h2>

        <ul className="secondary">
          <li>{language.kpiGoalsInfo1}</li>
          <li>{language.kpiGoalsInfo2}</li>
          <li>{language.kpiGoalsInfo3}</li>
          <li>{language.kpiGoalsInfo4}</li>
        </ul>
      </section>
    </AdminPageContainer>
  );
};

export default DashboardSettingsPage;
