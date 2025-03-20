import { FC } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

// const radioButtonRoleList: RadioListItem<RoleTypes>[] = [
//   {
//     label: 'User',
//     value: 'user',
//   },
//   {
//     label: 'Employee',
//     value: 'employee',
//   },
// ];

const UsersPage: FC = () => {
  const { language } = useLanguage();
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption={language.customersList}
          tableData={allUsers}
          tableHeaders={[language.username, language.email, language.role, '']}
        />
      )}
    </section>
  );
};

export default UsersPage;
