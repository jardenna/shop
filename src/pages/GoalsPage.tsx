import Icon from '../components/icons/Icon';
import SkeletonAdminGoalTable from '../components/skeleton/SkeletonAdminGoalTable';
import { useGetAdminGoalsQuery } from '../features/adminGoals/adminGoalsApiSlice';
import AdminGoalTable from '../features/adminGoals/components/AdminGoalTable';
import { useLanguage } from '../features/language/useLanguage';
import { IconName } from '../types/enums';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const GoalsPage = () => {
  const { language } = useLanguage();

  const { data: adminGoal, isLoading } = useGetAdminGoalsQuery();

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
      {isLoading && <SkeletonAdminGoalTable />}
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

export default GoalsPage;
