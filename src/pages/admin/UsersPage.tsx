import { FC, useState } from 'react';
import { RadioListItem } from '../../components/formElements/radioButton/RadioButton';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';
import { RoleTypes } from '../../types/types';

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
  const [userId, setUserId] = useState<string | null>(null);
  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();

  const initialState = {
    userRole: 'user',
  };

  const { onChange, onSubmit, values } = useFormValidation({
    initialState,
    callback: handleSubmit,
  });

  function handleSubmit() {
    const x = {
      userId,
      role: values.userRole,
    };
    console.log('test', x);
  }

  const handleShowUpdateRole = (id: string) => {
    setUserId(id);
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
          userId={userId}
          onChange={onChange}
          onSubmit={onSubmit}
          radioButtonRoleList={radioButtonRoleList}
          initialChecked={values.userRole}
        />
      )}
    </section>
  );
};

export default UsersPage;
