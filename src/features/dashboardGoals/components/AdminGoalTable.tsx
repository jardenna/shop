import {
  AdminGoalsRequest,
  AdminGoalsTableResponse,
} from '../../../app/api/apiTypes/adminGoalsApiTypes';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateDashboardGoals } from '../../../utils/validation/validateDashboardGoals';
import { kr } from '../../currency/currencyConverterUtil';
import { useLanguage } from '../../language/useLanguage';
import { useUpdateAdminGoalsMutation } from '../adminGoalsApiSlice';
import './_admin-goal-table.scss';

interface AdminGoalTableProps {
  dashboard: AdminGoalsTableResponse;
}

const AdminGoalTable = ({ dashboard }: AdminGoalTableProps) => {
  const { language } = useLanguage();

  const initialState = Object.fromEntries(
    dashboard.kpis.flatMap(({ key }) =>
      dashboard.tableHeaders.map(({ days }) => [
        `${key}-${days}`,
        dashboard.goals[key][days],
      ]),
    ),
  );

  const { values, onChange, onSubmit, errors, onClearAllValues, isFormDirty } =
    useFormValidation({
      initialState,
      callback: handleSubmitKpi,
      validate: validateDashboardGoals,
    });

  const handleClearAllValues = () => {
    onClearAllValues();
  };

  const [updateGoals, { isLoading }] = useUpdateAdminGoalsMutation();

  async function handleSubmitKpi() {
    const goals: AdminGoalsRequest['goals'] = Object.fromEntries(
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
      submitBtnLabel={language.save}
      onSubmit={onSubmit}
      isLoading={isLoading}
      className="admin-goal-form"
      cancelBtnProps={{ onCancel: handleClearAllValues }}
      disabled={!isFormDirty}
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

export default AdminGoalTable;
