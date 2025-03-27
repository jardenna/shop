import { FC, useState } from 'react';
import { UserResponse } from '../../app/api/apiTypes';
import EditField from '../../components/sortTable/EditField';
import Table from '../../components/sortTable/Table';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
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

  const handleSave = (id: string, field: keyof UserResponse) => {
    console.log(id, values[field], field);

    setEditRowId(null);
    setEditingField(null);
  };
  const handleCancel = () => {
    setEditRowId(null);
    setEditingField(null);
    setValues({});
  };
  const tds: (keyof UserResponse)[] = ['username', 'email', 'role'];

  return (
    <section>
      {allUsers && (
        <Table
          data={allUsers}
          columns={tableHeaders}
          tableCaption={language.customersList}
          isLoading={isLoading}
        >
          {(data) =>
            data.map(({ id }) => (
              <tr key={id}>
                {tds.map((td) => (
                  <td key={td}>
                    <EditField
                      onSave={() => {
                        handleSave(id, td);
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
                <td>hello</td>
              </tr>
            ))
          }
        </Table>
      )}
    </section>
  );
};

export default Dashboard;
