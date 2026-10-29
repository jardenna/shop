import { useState } from 'react';
import { DashboardPeriod } from '../app/api/apiTypes/dashboardGoalsApiTypes';
import Selectbox from '../components/selectbox/Selectbox';
import KpiCartList from '../features/dashboard/components/KpiCartList';
import {
  useGetPeriodKpiQuery,
  useGetTotalKpiQuery,
} from '../features/dashboard/dashboardApiSlice';
import { kpiOptions } from '../features/dashboardGoals/dashboardGoalsUtils';
import { useLanguage } from '../features/language/useLanguage';
import { OptionType } from '../types/types';
import './DashboardPage.styles.scss';
import AdminPageContainer from './pageContainer/AdminPageContainer';

const DashboardPage = () => {
  const { language } = useLanguage();
  const [selectedPeriod, setSelectedPeriod] = useState<DashboardPeriod>(7);

  const { data: totalKpi } = useGetTotalKpiQuery();
  const { data: periodKpi } = useGetPeriodKpiQuery(selectedPeriod);

  const handleSelectPeriod = (option: OptionType | null) => {
    if (option) {
      setSelectedPeriod(Number(option.value) as DashboardPeriod);
    }
  };

  return (
    <AdminPageContainer
      heading={language.dashboard}
      variant="x-large"
      hideBreadCrumbs
    >
      <Selectbox
        id="year"
        variant="secondary"
        defaultValue={kpiOptions[0]}
        options={kpiOptions}
        onChange={(option) => {
          handleSelectPeriod(option);
        }}
        inputHasNoLabel
        name="year"
        labelText={language.filterByYear}
      />
      {periodKpi && totalKpi && (
        <KpiCartList periodKpi={periodKpi} totalKpi={totalKpi} />
      )}
    </AdminPageContainer>
  );
};

export default DashboardPage;
