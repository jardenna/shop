import { useRef } from 'react';
import type { UserResponse } from '../../app/api/apiTypes/adminApiTypes';
import validateUpdateUser from '../../components/formElements/validation/validateUpdateUser';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import Tooltip from '../../components/tooltip/Tooltip';
import useAuth from '../../features/auth/hooks/useAuth';
import useLanguage from '../../features/language/useLanguage';
import EditUserInput from '../../features/users/EditUserInput';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/users/usersApiSlice';
import useTableEditField from '../../hooks/useTableEditField';
import useTrapFocus from '../../hooks/useTrapFocus';
import { AdminPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';
import PageContainer from '../pageContainer/PageContainer';
import DeleteUser from './DeleteUser';

const tableHeaders: { key: keyof UserResponse; label: string; name: string }[] =
  [
    { key: 'username', label: 'username', name: 'name' },
    { key: 'email', label: 'email', name: 'email' },
    { key: 'role', label: 'role', name: 'role' },
    { key: 'id', label: '', name: '' },
  ];

const columnKeys: (keyof UserResponse)[] = ['username', 'email', 'role'];

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { isAdmin } = useAuth();
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

  const allowedEditUser = !!isAdmin;

  const popupRef = useRef<HTMLDialogElement | null>(null);
  useTrapFocus({ id: 'deleteUser', popupRef });

  const {
    editRowId,
    editingField,
    handleShowEditInput,
    handleEditChange,
    handleCancelEdit,
    editValues,
    handleSaveEdit,
  } = useTableEditField({
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
        messagePopupType: 'success',
        message: language.userUpdated,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  }

  const handleDeleteUser = async (id: string, username: string) => {
    try {
      await deleteUser(id).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: `${username} ${language.deleted}`,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };

  return (
    <article className="admin-page page-medium">
      <PageContainer
        heading={language.users}
        linkText={isAdmin ? language.createNewUser : undefined}
        linkTo={isAdmin ? AdminPath.AdminUserCreate : undefined}
        onReset={() => refetch()}
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
            data.map(({ id, username, isAdmin }) => (
              <tr key={id}>
                {columnKeys.map((columnKey) => (
                  <td key={columnKey}>
                    <EditUserInput
                      isAdmin={isAdmin}
                      allowedEditUser={allowedEditUser}
                      onSave={() => {
                        handleSaveEdit();
                      }}
                      showEditInput={
                        editRowId === id && editingField === columnKey
                      }
                      onCancel={handleCancelEdit}
                      onEditChange={handleEditChange}
                      onEditBtnClick={() => {
                        handleShowEditInput(id, columnKey);
                      }}
                      id={columnKey}
                      value={String(editValues[columnKey] || '')}
                      roleValue={editValues.role || 'User'}
                      cellContent={String(
                        allUsers?.find((item) => item.id === id)?.[columnKey] ||
                          '',
                      )}
                    />
                  </td>
                ))}
                <td>
                  {allowedEditUser && !isAdmin && (
                    <Tooltip
                      placement="left-start"
                      ariaControls="delete-user"
                      tooltip={({ close }) => (
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
                      triggerBtnVariant={BtnVariant.Ghost}
                      triggerBtnClassName="danger"
                      ariaLabel={language.deleteUser}
                    >
                      <Icon
                        iconName={IconName.Trash}
                        title={language.trashCan}
                      />
                    </Tooltip>
                  )}
                </td>
              </tr>
            ))
          }
        </Table>
      </PageContainer>
    </article>
  );
};

export default UserPage;
