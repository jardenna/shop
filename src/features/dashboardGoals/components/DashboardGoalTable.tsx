import {
  DashboardGoalsRequest,
  DashboardResponse,
} from '../../../app/api/apiTypes/dashboardGoalsApiTypes';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateDashboardGoals } from '../../../utils/validation/validateDashboardGoals';
import { kr } from '../../currency/currencyConverterUtil';
import { useLanguage } from '../../language/useLanguage';
import { useUpdateDashboardGoalsMutation } from '../dashboardGoalsApiSlice';
import './_dashboard-goal-table.scss';
interface DashboardGoalTableProps {
  dashboard: DashboardResponse;
}

const DashboardGoalTable = ({ dashboard }: DashboardGoalTableProps) => {
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
    validate: validateDashboardGoals,
  });

  const [updateGoals, { isLoading: isUpdateGoalsLoading }] =
    useUpdateDashboardGoalsMutation();

  async function handleSubmitKpi() {
    const goals: DashboardGoalsRequest['goals'] = Object.fromEntries(
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
      className="dashboard-goal-form"
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
              <div className="kpi-text">
                <p className="text-bold">{language[kpi.label]}</p>
                <p>{language[kpi.description]}</p>
              </div>
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

export default DashboardGoalTable;
