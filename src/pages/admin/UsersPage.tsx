import { FC } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

export interface TableHeaders {
  id: number;
  key: string;
  label: string;
}
const UsersPage: FC = () => {
  const { language } = useLanguage();
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();
  const headers: TableHeaders[] = [
    { id: 1, key: 'username', label: language.username },
    { id: 2, key: 'email', label: language.email },
    { id: 3, key: 'role', label: language.role },
    { id: 4, key: '', label: '' },
  ];

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption={language.customersList}
          tableData={allUsers}
          headers={headers}
        />
      )}
    </section>
  );
};

export default UsersPage;
