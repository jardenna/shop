import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GoalPeriod } from '../app/api/apiTypes/adminGoalsApiTypes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Selectbox from '../components/selectbox/Selectbox';
import SkeltonKpiList from '../components/skeleton/skeletonKpiCart/SkeltonKpiList';
import { kpiOptions } from '../features/adminGoals/adminGoalsUtils';
import { useAuth } from '../features/auth/hooks/useAuth';
import KpiCartList from '../features/dashboard/components/kpi/KpiCartList';
import {
  useGetPeriodKpiQuery,
  useGetTotalKpiQuery,
} from '../features/dashboard/dashboardApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import { OptionType } from '../types/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<GoalPeriod>(7);
  const { currentUser } = useAuth();

  const {
    data: totalKpi,
    isLoading: isTotalKpiLoading,
    refetch: refetchTotalKpi,
  } = useGetTotalKpiQuery();

  const {
    data: periodKpi,
    isLoading: isPeriodKpiLoading,
    refetch: refetchPeriodKpi,
  } = useGetPeriodKpiQuery(selectedPeriod);

  const handleSelectPeriod = (option: OptionType | null) => {
    if (option) {
      setSelectedPeriod(Number(option.value) as GoalPeriod);
    }
  };

  const translatedOptions = kpiOptions.map((option) => ({
    ...option,
    label: language[option.label],
  }));

  const handleReset = () => {
    refetchTotalKpi();
    refetchPeriodKpi();
  };

  return (
    <AdminPageContainer
      heading={language.dashboard}
      variant="x-large"
      hideBreadCrumbs
      className="dashboard-page"
    >
      <LayoutElement
        ariaLabel={language.dashboard}
        className="dashboard-header"
      >
        <h2>
          {language.welcomeBack} {currentUser?.username}
        </h2>
        <Selectbox
          id="year"
          variant="secondary"
          defaultValue={translatedOptions[0]}
          options={translatedOptions}
          onChange={handleSelectPeriod}
          inputHasNoLabel
          name="year"
          labelText={language.filterByYear}
        />
      </LayoutElement>

      <ErrorBoundary
        FallbackComponent={ErrorBoundaryFallback}
        onReset={handleReset}
      >
        {isPeriodKpiLoading && isTotalKpiLoading && <SkeltonKpiList />}
        {periodKpi && totalKpi && (
          <KpiCartList
            periodKpi={periodKpi}
            totalKpi={totalKpi}
            selectedPeriod={selectedPeriod}
          />
        )}
      </ErrorBoundary>
    </AdminPageContainer>
  );
};

export default DashboardPage;
