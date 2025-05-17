import { UserResponse } from '../../app/api/apiTypes';
import validateUpdateUser from '../../components/formElements/validation/validateUpdateUser';
import IconContent from '../../components/IconContent';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import Table from '../../components/sortTable/Table';
import Tooltip from '../../components/tooltip/Tooltip';
import EditUserInput from '../../features/admin/users/EditUserInput';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useTableEditField from '../../hooks/useTableEditField';
import { MainPath } from '../../layout/nav/enums';
import { BtnVariant, IconName } from '../../types/enums';
import PageContainer from '../PageContainer';
import DeleteUser from './DeleteUser';

const tableHeaders: { key: keyof UserResponse; label: string; name: string }[] =
  [
    { key: 'username', label: 'username', name: 'name' },
    { key: 'email', label: 'email', name: 'email' },
    { key: 'role', label: 'role', name: 'role' },
    { key: 'id', label: '', name: '' },
  ];

const columnKeys: (keyof UserResponse)[] = ['username', 'email', 'role'];

const radioButtonList = [
  { value: 'Employee', label: 'employee' },
  { value: 'User', label: 'user' },
];

const UserPage = () => {
  const { language } = useLanguage();
  const { onAddMessagePopup } = useMessagePopup();
  const { data: allUsers, isLoading, refetch } = useGetAllUsersQuery();
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
    <article className="page page-medium">
      <PageContainer
        heading={language.users}
        linkText={language.createNewUser}
        linkTo={`/admin/${MainPath.AdminSubCategoryCreate}`}
        onReset={() => refetch}
      >
        <Table
          onReset={() => refetch}
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
                      radioButtonList={radioButtonList}
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
                          text={`${language.sureToDelete} ${username}?`}
                        />
                      )}
                      triggerBtnVariant={BtnVariant.Ghost}
                      triggerBtnClassName="danger"
                      ariaLabel={language.deleteUser}
                    >
                      <Icon
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.deleteUser}
                      />
                    </Tooltip>
                  ) : (
                    <span className="disabled-trash-icon flex-align-right">
                      <IconContent
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.adminCannotBeDeleted}
                      />
                    </span>
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
