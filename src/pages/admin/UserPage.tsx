import { useState } from 'react';
import { UserResponse } from '../../app/api/apiTypes';
import Dropdown from '../../components/dropdown/Dropdown';
import validateUpdateUser from '../../components/formElements/validation/validateUpdateUser';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import EditTableCell from '../../components/sortTable/EditTableCell';
import Table from '../../components/sortTable/Table';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
  useUpdateUserMutation,
} from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { BtnVariant, IconName } from '../../types/enums';
import { ChangeInputType } from '../../types/types';

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
  const { data: allUsers, isLoading } = useGetAllUsersQuery();
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [values, setValues] = useState<Partial<UserResponse>>({});
  const [editingField, setEditingField] = useState<keyof UserResponse | null>(
    null,
  );

  const [deleteUser] = useDeleteUserMutation();
  const [updateUser] = useUpdateUserMutation();
  const { onAddMessagePopup } = useMessagePopup();

  const handleEdit = (id: string, field: keyof UserResponse) => {
    setEditRowId(id);
    setEditingField(field);
    const row = allUsers?.find((item) => item.id === id);
    if (row) {
      setValues({ [field]: row[field] });
    }
  };

  const handleChange = (event: ChangeInputType) => {
    const { name, value } = event.target;
    setValues({ ...values, [name]: value });
  };

  const handleCancel = () => {
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };

  const handleSave = async (id: string) => {
    const validation = validateUpdateUser(values);

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
        user: values,
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

    setEditRowId(null);
    setEditingField(null);
  };

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
    allUsers && (
      <Table
        data={allUsers}
        columns={tableHeaders}
        tableCaption={language.customersList}
        isLoading={isLoading}
      >
        {(data) =>
          data.map(({ id, username, isAdmin }) => (
            <tr key={id}>
              {tableBodyCells.map((td) => (
                <td key={td}>
                  <EditTableCell
                    roleOptions={roleOptions}
                    isAdmin={isAdmin}
                    onSave={() => {
                      handleSave(id);
                    }}
                    showEditInput={editRowId === id && editingField === td}
                    id={td}
                    onChange={handleChange}
                    value={String(values[td] || '')}
                    roleValue={values.role || 'User'}
                    labelText={String(
                      allUsers.find((user) => user.id === id)?.[td] || '',
                    )}
                    onCancel={handleCancel}
                    onEdit={() => {
                      handleEdit(id, td);
                    }}
                  />
                </td>
              ))}
              <td>
                {!isAdmin && (
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
                )}
              </td>
            </tr>
          ))
        }
      </Table>
    )
  );
};

export default UserPage;
