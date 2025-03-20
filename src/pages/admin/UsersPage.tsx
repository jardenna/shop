import { FC, useState } from 'react';
import { RoleTypes } from '../../app/api/apiTypes';
import { RadioListItem } from '../../components/formElements/radioButton/RadioButton';
import MainTable from '../../features/admin/users/components/MainTable';
import { useGetAllUsersQuery } from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';
import useFormValidation from '../../hooks/useFormValidation';

const radioButtonRoleList: RadioListItem<RoleTypes>[] = [
  {
    label: 'User',
    value: 'user',
  },
  {
    label: 'Employee',
    value: 'employee',
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
