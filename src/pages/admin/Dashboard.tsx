import { FC } from 'react';
import { UserResponse } from '../../app/api/apiTypes';
import SortTable from '../../components/sortTable/FTable';

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
  { key: 'username', label: 'Username' },
  { key: 'email', label: 'Email' },
  { key: 'role', label: 'Role' },
  { key: 'id', label: '' },
];

const Dashboard: FC = () => (
  <section>
    <SortTable data={tableData} columns={tableHeaders}>
      {(data) =>
        data.map(({ id, email, username, role }) => (
          <tr key={id}>
            <td>{username}</td>
            <td>{email}</td>
            <td>{role}</td>
            <td>f</td>
          </tr>
        ))
      }
    </SortTable>
  </section>
);

export default Dashboard;
