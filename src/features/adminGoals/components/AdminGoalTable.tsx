import {
  AdminGoalsRequest,
  AdminGoalsTableResponse,
} from '../../../app/api/apiTypes/adminGoalsApiTypes';
import Form from '../../../components/Form';
import Input from '../../../components/formElements/Input';
import SimpleTable from '../../../components/simpleTable/SimpleTable';
import { useFormValidation } from '../../../hooks/useFormValidation';
import { validateAdminGoals } from '../../../utils/validation/validateAdminGoals';
import { kr } from '../../currency/currencyConverterUtil';
import { useLanguage } from '../../language/useLanguage';
import { useUpdateAdminGoalsMutation } from '../adminGoalsApiSlice';
import './_admin-goal-table.scss';

interface AdminGoalTableProps {
  adminGoal: AdminGoalsTableResponse;
}

const AdminGoalTable = ({ adminGoal }: AdminGoalTableProps) => {
  const { language } = useLanguage();
  const { kpis, tableHeaders, goals } = adminGoal;

  const initialState = Object.fromEntries(
    kpis.flatMap(({ key }) =>
      tableHeaders.map(({ days }) => [`${key}-${days}`, goals[key][days]]),
    ),
  );

  const { values, onChange, onSubmit, errors, onClearAllValues, isFormDirty } =
    useFormValidation({
      initialState,
      callback: handleSubmitKpi,
      validate: validateAdminGoals,
    });

  const handleClearAllValues = () => {
    onClearAllValues();
  };

  const [updateGoals, { isLoading }] = useUpdateAdminGoalsMutation();

  async function handleSubmitKpi() {
    const goals: AdminGoalsRequest['goals'] = Object.fromEntries(
      kpis.map(({ key }) => [
        key,
        Object.fromEntries(
          tableHeaders.map(({ days }) => [days, values[`${key}-${days}`]]),
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
        tableHeaderList={[{ id: 'kpi', label: 'kpi' }, ...tableHeaders]}
        tableDataList={kpis}
        rowKey={({ key }) => key}
        renderCells={(kpi) => (
          <>
            <td>
              <div className="kpi-text">
                <p className="text-bold">{language[kpi.label]}</p>
                <p>{language[kpi.description]}</p>
              </div>
            </td>

            {tableHeaders.map(({ id, days }) => {
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
