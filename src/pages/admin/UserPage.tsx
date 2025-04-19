import { UserResponse } from '../../app/api/apiTypes';
import Dropdown from '../../components/dropdown/Dropdown';
import validateUpdateUser from '../../components/formElements/validation/validateUpdateUser';
import IconContent from '../../components/IconContent';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import PageHeader from '../../components/PageHeader';
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

const tableHeaders: { key: keyof UserResponse; label: string; name: string }[] =
  [
    { key: 'username', label: 'username', name: 'name' },
    { key: 'email', label: 'email', name: 'email' },
    { key: 'role', label: 'role', name: 'role' },
    { key: 'id', label: '', name: '' },
  ];

const columnKeys: (keyof UserResponse)[] = ['username', 'email', 'role'];

const roleOptions = [
  { value: 'Employee', label: 'Employee' },
  { value: 'User', label: 'user' },
];

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
    <section className="page page-medium">
      <PageHeader
        heading={language.users}
        linkText={language.createNewSubCategory}
      />
      <div className="page-card">
        <Table
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
                      roleOptions={roleOptions}
                      isAdmin={isAdmin}
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
                  {!isAdmin ? (
                    <Dropdown
                      className="flex-align-right"
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
                    <span className="disabled-trash-icon flex-align-right">
                      <IconContent
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.actionNotAllowedForAdmin}
                      />
                    </span>
                  )}
                </td>
              </tr>
            ))
          }
        </Table>
      </div>
    </section>
  );
};

export default UserPage;
