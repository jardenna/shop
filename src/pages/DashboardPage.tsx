import { useState } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { GoalPeriod } from '../app/api/apiTypes/adminGoalsApiTypes';
import ErrorBoundaryFallback from '../components/ErrorBoundaryFallback';
import Selectbox from '../components/selectbox/Selectbox';
import { kpiOptions } from '../features/adminGoals/adminGoalsUtils';
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

  const { data: totalKpi, refetch: refetchTotalKpi } = useGetTotalKpiQuery();

  const { data: periodKpi, refetch: refetchPeriodKpi } =
    useGetPeriodKpiQuery(selectedPeriod);

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
        <h2>Welcome back</h2>
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
