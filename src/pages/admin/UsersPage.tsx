import { FC, useState } from 'react';
import { RadioListItem } from '../../components/formElements/radioButton/RadioButton';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { RoleTypes } from '../../types/types';

export interface UpdateUserRole {
  id: number;
  role: RoleTypes;
}

const radioButtonRoleList: RadioListItem<RoleTypes>[] = [
  {
    label: 'User',
    value: 'User',
  },
  {
    label: 'Employee',
    value: 'Employee',
  },
];

const UsersPage: FC = () => {
  const { language } = useLanguage();

  const initialState = {
    userRole: 'user',
  };

  const [showForm, setShowForm] = useState<number | null>(null);
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();

  const { onChange, onSubmit, values } = useFormValidation({
    initialState,
  });

  const handleOnSubmit = (user: UpdateUserRole) => {
    const x = {
      userId: user.id,
      role: values.userRole,
    };
    console.log('test', x);
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
          onShowUpdateRole={handleShowUpdateRole}
          showForm={showForm}
          onChange={onChange}
          onSubmit={onSubmit}
          handleOnSubmit={handleOnSubmit}
          radioButtonRoleList={radioButtonRoleList}
          initialChecked={values.userRole}
        />
      )}
    </section>
  );
};

export default UsersPage;
