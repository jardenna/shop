import { FC, useState } from 'react';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

const UsersPage: FC = () => {
  const { language } = useLanguage();

  const [showForm, setShowForm] = useState<number | null>(null);
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();

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
          value=""
          onShowUpdateRole={handleShowUpdateRole}
          showForm={showForm}
        />
      )}
    </section>
  );
};

export default UsersPage;
