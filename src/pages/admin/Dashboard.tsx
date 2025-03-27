import { FC, useState } from 'react';
import { UserResponse } from '../../app/api/apiTypes';
import Dropdown from '../../components/dropdown/Dropdown';
import Icon from '../../components/icons/Icon';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import EditField from '../../components/sortTable/EditField';
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

const Dashboard: FC = () => {
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

  const handleSave = async (id: string, username: string) => {
    try {
      await updateUser({
        id,
        user: values,
      }).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: `${username} updated`,
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
        message: `${username} deleted`,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };
  const tableBodyCells: (keyof UserResponse)[] = ['username', 'email', 'role'];

  return (
    allUsers && (
      <Table
        data={allUsers}
        columns={tableHeaders}
        tableCaption={language.customersList}
        isLoading={isLoading}
      >
        {(data) =>
          data.map(({ id, role, username }) => (
            <tr key={id}>
              {tableBodyCells.map((td) => (
                <td key={td}>
                  <EditField
                    onSave={() => {
                      handleSave(id, username);
                    }}
                    showEditInput={editRowId === id && editingField === td}
                    id={td}
                    onChange={handleChange}
                    value={String(values[td] || '')}
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
                <div>
                  {role !== 'Admin' && (
                    <Dropdown
                      ariaControls="delete-user"
                      text={`${language.sureToDelete} ${username}?`}
                      btnVariant={BtnVariant.Ghost}
                      onPrimaryClick={() => {
                        handleDeleteUser(id, username);
                      }}
                      primaryBtnLabel={language.delete}
                      primaryBtnClassName="danger"
                      ariaLabel={language.deleteCustomer}
                      className="danger"
                    >
                      <Icon
                        iconName={IconName.Trash}
                        title={language.trashCan}
                        ariaLabel={language.deleteCustomer}
                      />
                    </Dropdown>
                  )}
                </div>
              </td>
            </tr>
          ))
        }
      </Table>
    )
  );
};

export default Dashboard;
