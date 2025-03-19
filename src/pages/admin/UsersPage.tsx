import { FC, useState } from 'react';
import { RadioListItem } from '../../components/formElements/radioButton/RadioButton';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

export interface UpdateUserRole {
  id: number;
  role: string;
}

const radioButtonRoleList: RadioListItem[] = [
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Employe',
    value: 'employe',
  },
];

const UsersPage: FC = () => {
  const { language } = useLanguage();

  const initialState = {
    roleOption: 'user',
  };

  const [showForm, setShowForm] = useState<number | null>(null);
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();
  const [userRole, setUserRole] = useState('');

  const handleOnSubmit = (user: UpdateUserRole) => {
    const x = {
      userId: user.id,
      role: userRole,
    };
    console.log(x);
  };

  const handleShowUpdateRole = (id: number) => {
    setShowForm(id);
    setUserRole('');
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
          onChange={(event) => {
            setUserRole(event.target.value);
          }}
          onSubmit={handleOnSubmit}
        />
      )}
    </section>
  );
};

export default UsersPage;
