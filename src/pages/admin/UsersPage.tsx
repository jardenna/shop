import { FC } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

export interface TableHeaders {
  id: number;
  key: string | null;
  label: string;
}
const UsersPage: FC = () => {
  const { language } = useLanguage();
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();
  const tableHeaders: TableHeaders[] = [
    { id: 1, key: 'username', label: language.username },
    { id: 2, key: 'email', label: language.email },
    { id: 3, key: 'role', label: language.role },
    { id: 4, key: null, label: '' },
  ];

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption={language.customersList}
          tableData={allUsers}
          tableHeaders={tableHeaders}
        />
      )}
    </section>
  );
};

export default UsersPage;
