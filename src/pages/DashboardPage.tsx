import { useState } from 'react';
import { GoalPeriod } from '../app/api/apiTypes/dashboardGoalsApiTypes';
import Selectbox from '../components/selectbox/Selectbox';
import KpiCartList from '../features/dashboard/components/kpi/KpiCartList';
import {
  useGetPeriodKpiQuery,
  useGetTotalKpiQuery,
} from '../features/dashboard/dashboardApiSlice';
import { kpiOptions } from '../features/dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../features/language/useLanguage';
import LayoutElement from '../layout/LayoutElement';
import { OptionType } from '../types/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<GoalPeriod>(7);

  const { data: totalKpi } = useGetTotalKpiQuery();
  const { data: periodKpi } = useGetPeriodKpiQuery(selectedPeriod);

  const handleSelectPeriod = (option: OptionType | null) => {
    if (option) {
      setSelectedPeriod(Number(option.value) as GoalPeriod);
    }
  };

  const translatedOptions = kpiOptions.map((option) => ({
    ...option,
    label: language[option.label],
  }));

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
          onChange={(option) => {
            handleSelectPeriod(option);
          }}
          inputHasNoLabel
          name="year"
          labelText={language.filterByYear}
        />
      </LayoutElement>

      {periodKpi && totalKpi && (
        <KpiCartList
          periodKpi={periodKpi}
          totalKpi={totalKpi}
          selectedPeriod={selectedPeriod}
        />
      )}
    </AdminPageContainer>
  );
};

export default DashboardPage;
