import { Roles } from '../../app/api/apiTypes/adminApiTypes';
import DeleteItem from '../../components/deleteItem/DeleteItem';
import SortTable from '../../components/sortTable/SortTable';
import { createInitialFilters } from '../../components/sortTable/utils/tableFiltersUtils';
import { useToast } from '../../components/toast/hooks/useToast';
import UpdateUser from '../../features/adminUsers/components/UpdateUser';
import UpdateUserTableText from '../../features/adminUsers/components/UpdateUserTableText';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/adminUsers/userApiSlice';
import { tableHeaders } from '../../features/adminUsers/userTableHeaders';
import { useUpdateUserField } from '../../features/adminUsers/useUpdateUserField';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { AdminPath } from '../../layout/nav/enums';
import { validateUpdateUser } from '../../utils/validation/validateUpdateUser';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const columnKeys = ['username', 'email', 'role'] as const;

export type ColumnKey = (typeof columnKeys)[number];

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddToast } = useToast();

  const { isAdmin: isAllowedUpdateUsers } = useAuth();
  const { sortOrder, onSort, sortField } = useSortParamsState({
    columns: tableHeaders,
  });

  const initialFilters = createInitialFilters(tableHeaders);

  const { filterParams, setFilterParams, onRemoveFilterTag } =
    useSearchParamsState(initialFilters);

  const debouncedUsername = useDebouncedValue(filterParams.username);
  const debouncedEmail = useDebouncedValue(filterParams.email);

  const {
    data: allUsers,
    isLoading,
    refetch,
    isError,
    error,
  } = useGetAllUsersQuery({
    sortField,
    sortOrder,
    username: debouncedUsername,
    email: debouncedEmail,
    role: filterParams.role as Roles,
  });

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const { onShowUpdateInput, onUpdateChange, values, onSave, isFormDirty } =
    useUpdateUserField({
      data: allUsers || [],
      callback: handleUpdateUser,
    });

  async function handleUpdateUser(id: string) {
    const validation = validateUpdateUser(values);

    if (validation) {
      onAddToast({
        type: 'error',
        message: language[validation],
      });
      return;
    }

    await updateUser({
      id,
      user: values,
    }).unwrap();
    onAddToast({
      message: language.userUpdated,
    });
  }

  async function handleDeleteUser(id: string, username: string) {
    await deleteUser(id).unwrap();

    onAddToast({
      message: `${username} ${language.deleted}`,
    });
  }

  return (
    <AdminPageContainer
      heading={language.users}
      linkText={language.createNewUser}
      linkTo={AdminPath.AdminUserCreate}
      variant="medium"
    >
      <SortTable
        btnLabel="users"
        navigationPath="users"
        isError={isError}
        error={error}
        values={filterParams}
        onRemoveFilterTag={onRemoveFilterTag}
        onFilter={setFilterParams}
        initialFilters={initialFilters}
        onReset={() => refetch()}
        data={allUsers || []}
        columns={tableHeaders}
        tableCaption={language.customersList}
        isLoading={isLoading}
        emptyHeaderCellText={language.deleteUser}
        onSort={onSort}
        sortField={sortField}
        sortOrder={sortOrder}
      >
        {(data) =>
          data.map((userItem) => {
            const { id, username, isAdmin } = userItem;

            return (
              <tr key={id}>
                {columnKeys.map((columnKey) => (
                  <td key={columnKey}>
                    <div className="update-user">
                      <UpdateUserTableText
                        text={userItem[columnKey]}
                        language={language}
                      />

                      <UpdateUser
                        submitBtnLabel={language.save}
                        isFormDirty={isFormDirty}
                        onUpdateChange={onUpdateChange}
                        onOpenPopup={() => {
                          onShowUpdateInput(id, columnKey);
                        }}
                        ariaLabel={`${language.updateUser} ${columnKey}`}
                        id={columnKey}
                        value={values[columnKey] || ''}
                        roleValue={values.role || 'User'}
                        onSave={onSave}
                        language={language}
                      />
                    </div>
                  </td>
                ))}
                <td>
                  {isAllowedUpdateUsers && !isAdmin && (
                    <DeleteItem
                      isLoading={isLoading}
                      ariaLabel={language.deleteUser}
                      onDeleteItem={() => {
                        handleDeleteUser(id, username);
                      }}
                      itemName={username}
                    />
                  )}
                </td>
              </tr>
            );
          })
        }
      </SortTable>
    </AdminPageContainer>
  );
};

export default UserPage;
