import { useRef } from 'react';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import DeleteUser from '../../features/adminUsers/components/DeleteUser';
import EditTableText from '../../features/adminUsers/components/EditTableText';
import UpdateUser from '../../features/adminUsers/components/UpdateUser';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/users/userApiSlice';
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

  const {
    data: allUsers,
    isLoading,
    refetch,
  } = useGetAllUsersQuery({ sortField, sortOrder });
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

  const handleDeleteUser = async (id: string, username: string) => {
    try {
      await deleteUser(id).unwrap();
      onAddMessagePopup({
        message: `${username} ${language.deleted}`,
      });
    } catch (error) {
      handleApiError(error, onAddMessagePopup);
    }
  };

  return (
    <AdminPageContainer
      heading={language.users}
      linkText={isAdmin ? language.createNewUser : undefined}
      linkTo={isAdmin ? AdminPath.AdminUserCreate : undefined}
      variant="medium"
      ariaLabelledby="users"
    >
      <Table
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
                      <EditTableText text={userItem[columnKey]} />
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
                    <DeleteUser
                      onDeleteUser={() => {
                        handleDeleteUser(id, username);
                      }}
                      username={username}
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
