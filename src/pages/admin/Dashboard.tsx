import { FC, useState } from 'react';
import { UserResponse } from '../../app/api/apiTypes';
import EditField from '../../components/sortTable/EditField';
import Table from '../../components/sortTable/Table';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';

const tableData: UserResponse[] = [
  {
    username: 'Helle',
    email: 'helle@mail.com',
    isAdmin: true,
    createdAt: '2025-03-04T14:08:11.632Z',
    updatedAt: '2025-03-25T13:12:10.175Z',
    role: 'admin',
    id: '67c7094be192fbb4ee3890c3',
  },
  {
    username: 'Steen',
    email: 'steen@mail.com',
    isAdmin: false,
    role: 'user',
    createdAt: '2025-03-21T15:25:32.038Z',
    updatedAt: '2025-03-21T16:14:18.217Z',
    id: '67dd84ec6ef559ec91f7080d',
  },
  {
    username: 'Helene K',
    email: 'helene@mail.com',
    isAdmin: false,
    role: 'employee',
    createdAt: '2025-03-21T15:34:37.694Z',
    updatedAt: '2025-03-26T07:46:24.987Z',
    id: '67dd870d5d44e490f0ae7de3',
  },
];
const tableHeaders: { key: keyof UserResponse; label: string }[] = [
  { key: 'username', label: 'username' },
  { key: 'email', label: 'email' },
  { key: 'role', label: 'role' },
  { key: 'id', label: '' },
];

const Dashboard: FC = () => {
  const { language } = useLanguage();
  const [editRowId, setEditRowId] = useState<string | null>(null);
  const [values, setValues] = useState<Partial<UserResponse>>({});
  const [editingField, setEditingField] = useState<keyof UserResponse | null>(
    null,
  );
  const handleEdit = (id: string, field: keyof UserResponse) => {
    setEditRowId(id);
    setEditingField(field);
    const row = tableData.find((item) => item.id === id);
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

  return (
    <section>
      <Table
        data={tableData}
        columns={tableHeaders}
        tableCaption={language.customersList}
        isLoading={false}
      >
        {(data) =>
          data.map(({ id, email, username, role }) => (
            <tr key={id}>
              <td>
                <EditField
                  onSave={() => {
                    handleSave(id, 'username');
                  }}
                  showEditInput={
                    editRowId === id && editingField === 'username'
                  }
                  id="username"
                  onChange={handleChange}
                  value={values.username || ''}
                  labelText={username}
                  onCancel={handleCancel}
                  onEdit={() => {
                    handleEdit(id, 'username');
                  }}
                />
              </td>
              <td>{email}</td>
              <td>{role}</td>
              <td>f</td>
            </tr>
          ))
        }
      </Table>
    </section>
  );
};

export default Dashboard;
