import { FC } from 'react';
import useMessagePopup from '../../components/messagePopup/useMessagePopup';
import MainTable from '../../features/admin/users/components/MainTable';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../../features/admin/users/usersApiSlice';
import useLanguage from '../../features/language/useLanguage';

export interface TableHeaders {
  id: number;
  key: string | null;
  label: string;
}
const UsersPage: FC = () => {
  const { language } = useLanguage();
  const tableHeaders: TableHeaders[] = [
    { id: 1, key: 'username', label: language.username },
    { id: 2, key: 'email', label: language.email },
    { id: 3, key: 'role', label: language.role },
    { id: 4, key: null, label: '' },
  ];

  const { data: allUsers, isLoading, isFetching } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { onAddMessagePopup } = useMessagePopup();

  const handleDeleteUser = async (id: string, username: string) => {
    try {
      await deleteUser(id).unwrap();
      onAddMessagePopup({
        messagePopupType: 'success',
        message: `${username} deleted`,
      });
    } catch (error: any) {
      onAddMessagePopup({
        messagePopupType: 'error',
        message: error.data.message,
        componentType: 'notification',
      });
    }
  };

  return (
    <section>
      {allUsers && (
        <MainTable
          isLoading={isLoading}
          isPending={isFetching}
          tableCaption={language.customersList}
          tableData={allUsers}
          tableHeaders={tableHeaders}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </section>
  );
};

export default UsersPage;
