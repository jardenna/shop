import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import type { GoalPeriod } from '../app/api/apiTypes/adminGoalsApiTypes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Selectbox from '../components/selectbox/Selectbox';
import SkeltonKpiList from '../components/skeleton/skeletonKpiCard/SkeltonKpiList';
import { kpiOptions } from '../features/adminGoals/adminGoalsUtils';
import { useAuth } from '../features/auth/hooks/useAuth';
import KpiCardList from '../features/dashboard/components/kpi/KpiCardList';
import {
  useGetPeriodKpiQuery,
  useGetTotalKpiQuery,
} from '../features/dashboard/dashboardApiSlice';
import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import type { OptionType } from '../shared/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<GoalPeriod>('7');
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
      setSelectedPeriod(option.value as GoalPeriod);
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
          value={selectedPeriod}
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
          <KpiCardList
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
