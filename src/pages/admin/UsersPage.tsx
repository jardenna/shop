import { FC } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';

const UsersPage: FC = () => {
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption="User list"
          tableData={allUsers}
          tableHeaders={['name', 'email', 'Role', 'action']}
        />
      )}
    </section>
  );
};

export default UsersPage;
