import { FC, useState } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import { ChangeInputType } from '../../types/types';

const UsersPage: FC = () => {
  const { language } = useLanguage();

  const [showForm, setShowForm] = useState<number | null>(null);
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();
  const [userRole, setUserRole] = useState('');

  const handleOnSubmit = (id: any) => {
    const x = {
      userId: id.id,
      role: userRole,
    };
    console.log(x);
  };

  const handleShowUpdateRole = (id: number) => {
    setShowForm(id);
  };

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption={language.customersList}
          tableData={allUsers}
          tableHeaders={[language.username, language.email, language.role, '']}
          value={userRole}
          onShowUpdateRole={handleShowUpdateRole}
          showForm={showForm}
          onChange={(e: ChangeInputType) => {
            setUserRole(e.target.value);
          }}
          onSubmit={handleOnSubmit}
        />
      )}
    </section>
  );
};

export default UsersPage;
