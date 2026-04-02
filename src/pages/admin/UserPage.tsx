import { useRef } from 'react';
import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import Icon from '../../components/icons/Icon';
import { useMessagePopup } from '../../components/messagePopup/useMessagePopup';
import Popup from '../../components/popup/Popup';
import EditTableText from '../../components/sortTable/EditTableText';
import Table from '../../components/sortTable/Table';
import { useGetAllUsersQuery } from '../../features/adminUsers/adminUserApiSlice';
import DeleteUser from '../../features/adminUsers/components/DeleteUser';
import EditUserInput from '../../features/adminUsers/components/EditUserInput';
import { useAuth } from '../../features/auth/hooks/useAuth';
import { useLanguage } from '../../features/language/useLanguage';
import {
  useDeleteUserMutation,
  useUpdateUserMutation,
} from '../../features/users/userApiSlice';
import { useTableEditField } from '../../hooks/useTableEditField';
import { useTrapFocus } from '../../hooks/useTrapFocus';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';
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
                    <EditTableText text={userItem[columnKey]} />

                    <Popup
                      onOpenPopup={() => {
                        handleShowEditInput(id, columnKey);
                      }}
                      popupContent={({ close }) => (
                        <EditUserInput
                          labelText={columnKey}
                          onSave={() => {
                            handleSaveEdit();
                            close();
                          }}
                          onCancel={close}
                          onEditChange={handleEditChange}
                          id={columnKey}
                          value={editValues[columnKey] || ''}
                          roleValue={editValues.role || 'User'}
                        />
                      )}
                      triggerBtnVariant={BtnVariant.Ghost}
                      ariaLabel={`${language.updateUser} ${columnKey}`}
                    >
                      <Icon iconName={IconName.Pencil} />
                    </Popup>
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
