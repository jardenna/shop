import { DashboardResponse } from '../../../app/api/apiTypes/dashboardApiTypes';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { kr } from '../../currency/currencyConverterUtil';
import { useLanguage } from '../../language/useLanguage';
import { useUpdateDashboardGoalsMutation } from '../dashboardGoalsApiSlice';

interface DashboardKpiTableProps {
  dashboard: DashboardResponse;
}

const DashboardKpiTable = ({ dashboard }: DashboardKpiTableProps) => {
  const { language } = useLanguage();

  const initialState = Object.fromEntries(
    dashboard.kpis.flatMap(({ key }) =>
      dashboard.tableHeaders.map(({ days }) => [
        `${key}-${days}`,
        dashboard.goals[key][days],
      ]),
    ),
  );

  const { values, onChange, onSubmit, errors } = useFormValidation({
    initialState,
    callback: handleSubmitKpi,
  });

  const [updateGoals, { isLoading: isUpdateGoalsLoading }] =
    useUpdateDashboardGoalsMutation();

  async function handleSubmitKpi() {
    const goals = Object.fromEntries(
      dashboard.kpis.map(({ key }) => [
        key,
        Object.fromEntries(
          dashboard.tableHeaders.map(({ days }) => [
            days,
            values[`${key}-${days}`],
          ]),
        ),
      ]),
    );

    await updateGoals({ goals }).unwrap();
  }

  return (
    <Form
      submitBtnLabel="Gem ændringer"
      onSubmit={onSubmit}
      isLoading={isUpdateGoalsLoading}
    >
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
            {dashboard.tableHeaders.map(({ id, days }) => {
              const name = `${kpi.key}-${days}`;

              return (
                <td key={id}>
                  <Input
                    variant="secondary"
                    name={name}
                    id={name}
                    value={values[name]}
                    labelText={language[kpi.label]}
                    onChange={onChange}
                    type="number"
                    required
                    errorText={
                      errors[name] ? language[errors[name]] : undefined
                    }
                    inputHasNoLabel
                    inputSuffix={kpi.key === 'revenue' ? kr : undefined}
                    inputMode="numeric"
                  />
                </td>
              );
            })}
          </>
        )}
      />
    </Form>
  );
};

export default DashboardKpiTable;
