import { UserResponse } from '../../app/api/apiTypes';
import Dropdown from '../../components/dropdown/Dropdown';
import validateUpdateUser from '../../components/formElements/validation/validateUpdateUser';
import IconContent from '../../components/IconContent';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import EditUserInput from '../../features/admin/users/EditUserInput';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useTableEditField from '../../hooks/useTableEditField';
import { BtnVariant, IconName } from '../../types/enums';

const tableHeaders: { key: keyof UserResponse; label: string }[] = [
  { key: 'username', label: 'username' },
  { key: 'email', label: 'email' },
  { key: 'role', label: 'role' },
  { key: 'id', label: '' },
];

const roleOptions = [
  { value: 'Employee', label: 'Employee' },
  { value: 'User', label: 'user' },
];

const tableBodyCells: (keyof UserResponse)[] = ['username', 'email', 'role'];

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allUsers, isLoading } = useGetAllUsersQuery();

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();

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
    <section className="user-page">
      {allUsers && (
        <Table
          data={allUsers}
          columns={tableHeaders}
          tableCaption={language.customersList}
          isLoading={isLoading}
          emptyHeaderCellText={language.deleteUser}
        >
          {(data) =>
            data.map(({ id, username, isAdmin }) => (
              <tr key={id}>
                {tableBodyCells.map((td) => (
                  <td key={td}>
                    <EditUserInput
                      roleOptions={roleOptions}
                      isAdmin={isAdmin}
                      onSave={() => {
                        handleSaveEdit();
                      }}
                      showEditInput={editRowId === id && editingField === td}
                      id={td}
                      onChange={handleEditChange}
                      value={String(editValues[td] || '')}
                      roleValue={editValues.role || 'User'}
                      labelText={String(
                        allUsers.find((user) => user.id === id)?.[td] || '',
                      )}
                      onCancel={handleCancelEdit}
                      onEdit={() => {
                        handleShowEditInput(id, td);
                      }}
                    />
                  </td>
                ))}
                <td>
                  {!isAdmin ? (
                    <Dropdown
                      ariaControls="delete-user"
                      text={`${language.sureToDelete} ${username}?`}
                      triggerBtnVariant={BtnVariant.Ghost}
                      triggerBtnClassName="danger"
                      onPrimaryClick={() => {
                        handleDeleteUser(id, username);
                      }}
                      primaryBtnLabel={language.delete}
                      primaryBtnVariant={BtnVariant.Danger}
                      ariaLabel={language.deleteUser}
                    >
                      <Icon
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.deleteUser}
                      />
                    </Dropdown>
                  ) : (
                    <div className="empty-cell">
                      <IconContent
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.actionNotAllowedForAdmin}
                      />
                    </div>
                  )}
                </td>
              </tr>
            ))
          }
        </Table>
      )}
    </section>
  );
};

export default UserPage;
