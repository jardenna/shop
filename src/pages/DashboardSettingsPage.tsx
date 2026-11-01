import Icon from '../components/icons/Icon';
import { useGetAdminGoalsQuery } from '../features/dashboardGoals/adminGoalsApiSlice';
import AdminGoalTable from '../features/dashboardGoals/components/AdminGoalTable';
import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardSettingsPage = () => {
  const { language } = useLanguage();

  const { data: adminGoal } = useGetAdminGoalsQuery();

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
      {adminGoal && <AdminGoalTable adminGoal={adminGoal} />}

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
