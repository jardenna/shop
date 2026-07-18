import { useRef } from 'react';
import { Roles } from '../../app/api/apiTypes/adminApiTypes';
import DeleteItem from '../../components/deleteItem/DeleteItem';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import { createInitialFilters } from '../../components/sortTable/tableFilters/tableFiltersUtils';
import EditTableText from '../../features/adminUsers/components/EditTableText';
import UpdateUser from '../../features/adminUsers/components/UpdateUser';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/users/userApiSlice';
import { useDebouncedValue } from '../../hooks/useDebouncedValue';
import { useSearchParamsState } from '../../hooks/useSearchParamsState';
import { useSortParamsState } from '../../hooks/useSortParamsState';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { AdminPath } from '../../layout/nav/enums';
import { handleApiError } from '../../utils/handleApiError';
import { validateUpdateUser } from '../../utils/validation/validateUpdateUser';
import AdminPageContainer from '../pageContainer/AdminPageContainer';
import './userPage.styles.scss';
import { tableHeaders } from './userTableHeaders';
import { useUserEditField } from './useUserEditField';

const columnKeys = ['username', 'email', 'role'] as const;

export type ColumnKey = (typeof columnKeys)[number];

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { isAdmin } = useAuth();
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
  } = useGetAllUsersQuery({
    sortField,
    sortOrder,
    username: debouncedUsername,
    email: debouncedEmail,
    role: filterParams.role as Roles,
  });
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const allowedEditUser = isAdmin;

  const popupRef = useRef<HTMLDialogElement | null>(null);
  useTrapFocus({ id: 'deleteUser', popupRef });

  const {
    handleShowEditInput,
    handleEditChange,
    editValues,
    handleSaveEdit,
    isFormDirty,
  } = useUserEditField({
    data: allUsers || [],
    callback: handleUpdateUser,
  });

  async function handleUpdateUser(id: string) {
    const validation = validateUpdateUser(editValues);

    if (validation) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: language[validation],
        componentType: 'notification',
      });
      return;
    }

    try {
      await updateUser({
        id,
        user: editValues,
      }).unwrap();
      onAddMessagePopup({
        message: language.userUpdated,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  async function handleDeleteUser(id: string, username: string) {
    try {
      await deleteUser(id).unwrap();

      onAddMessagePopup({
        message: `${username} ${language.deleted}`,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  }

  return (
    <AdminPageContainer
      heading={language.users}
      linkText={isAdmin ? language.createNewUser : undefined}
      linkTo={isAdmin ? AdminPath.AdminUserCreate : undefined}
      variant="medium"
      ariaLabelledby="users"
    >
      <Table
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
                    <div className="edit-user">
                      <EditTableText
                        text={userItem[columnKey]}
                        language={language}
                      />
                      {!isAdmin && (
                        <UpdateUser
                          submitBtnLabel={language.save}
                          isFormDirty={isFormDirty}
                          onEditChange={handleEditChange}
                          onOpenPopup={() => {
                            handleShowEditInput(id, columnKey);
                          }}
                          ariaLabel={`${language.updateUser} ${columnKey}`}
                          id={columnKey}
                          value={editValues[columnKey] || ''}
                          roleValue={editValues.role || 'User'}
                          onSaveEdit={handleSaveEdit}
                        />
                      )}
                    </div>
                  </td>
                ))}
                <td>
                  {allowedEditUser && !isAdmin && (
                    <DeleteItem
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
      </Table>
    </AdminPageContainer>
  );
};

export default UserPage;
