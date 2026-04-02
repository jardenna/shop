import { useRef } from 'react';
import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import Icon from '../../components/icons/Icon';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import Popup from '../../components/popup/Popup';
import Table from '../../components/sortTable/Table';
import { useGetAllUsersQuery } from '../../features/adminUsers/adminUserApiSlice';
import DeleteUser from '../../features/adminUsers/components/DeleteUser';
import UpdateUser from '../../features/adminUsers/components/UpdateUser';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../features/users/userApiSlice';
import { useTableEditField } from '../../hooks/useTableEditField';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { AdminPath } from '../../layout/nav/enums';
import { IconName } from '../../types/enums';
import { handleApiError } from '../../utils/handleApiError';
import { validateUpdateUser } from '../../utils/validation/validateUpdateUser';
import AdminPageContainer from '../pageContainer/AdminPageContainer';

const tableHeaders: { key: keyof UserResponse; label: string; name: string }[] =
  [
    { key: 'username', label: 'username', name: 'name' },
    { key: 'email', label: 'email', name: 'email' },
    { key: 'role', label: 'role', name: 'role' },
    { key: 'id', label: '', name: '' },
  ];

const columnKeys = ['username', 'email', 'role'] as const;

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { isAdmin } = useAuth();
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const allowedEditUser = isAdmin;

  const popupRef = useRef<HTMLDialogElement | null>(null);
  useTrapFocus({ id: 'deleteUser', popupRef });

  const { handleShowEditInput, handleEditChange, editValues, handleSaveEdit } =
    useTableEditField({
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
      >
        {(data) =>
          data.map((userItem) => {
            const { id, username, isAdmin } = userItem;

            return (
              <tr key={id}>
                {columnKeys.map((columnKey) => (
                  <td key={columnKey}>
                    <UpdateUser
                      onEditChange={handleEditChange}
                      onOpenPopup={() => {
                        handleShowEditInput(id, columnKey);
                      }}
                      text={userItem[columnKey]}
                      ariaLabel={`${language.updateUser} ${columnKey}`}
                      columnKey={columnKey}
                      value={editValues[columnKey] || ''}
                      roleValue={editValues.role || 'User'}
                      handleSaveEdit={handleSaveEdit}
                    />
                  </td>
                ))}
                <td>
                  {allowedEditUser && !isAdmin && (
                    <Popup
                      placement="left-start"
                      popupContent={({ close }) => (
                        <DeleteUser
                          onPrimaryClick={() => {
                            handleDeleteUser(id, username);
                            close();
                          }}
                          onSecondaryClick={close}
                          username={username}
                          ref={popupRef}
                        />
                      )}
                      triggerBtnClassName="danger"
                      ariaLabel={language.deleteUser}
                    >
                      <Icon iconName={IconName.Trash} />
                    </Popup>
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
