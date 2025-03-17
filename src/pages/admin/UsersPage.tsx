import { FC } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';

interface UsersPageProps {
  name?: string;
}

export interface Users {
  email: string;
  name: string;
  role: string;
}
const tableData = [
  { name: 'Helle', email: 'helle@mail.com', role: 'admin' },
  { name: 'Helle', email: 'helle@mail.com', role: 'admin' },
  { name: 'Helle', email: 'helle@mail.com', role: 'admin' },
  { name: 'Helle', email: 'helle@mail.com', role: 'admin' },
];

const UsersPage: FC<UsersPageProps> = ({ name }) => (
  <section>
    {name}

    <MainTable
      isLoading={false}
      isPending={false}
      tableCaption="User list"
      tableData={tableData}
      tableHeaders={['name', 'email', 'Role', 'action']}
    />
  </section>
);

export default UsersPage;
