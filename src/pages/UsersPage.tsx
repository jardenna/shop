import { FC } from 'react';
import useMessagePopup from '../components/messagePopup/useMessagePopup';
import Table from '../features/admin/users/components/newTable/UserTable';
import { SortingState } from '../features/admin/users/components/newTable/use-table-sort-hook';
import {
  useDeleteUserMutation,
  useGetAllUsersQuery,
} from '../features/admin/users/usersApiSlice';
import useLanguage from '../features/language/useLanguage';

const UsersPage: FC = () => {
  const { language } = useLanguage();
  const { data: allUsers } = useGetAllUsersQuery();
  const [deleteUser] = useDeleteUserMutation();
  const { onAddMessagePopup } = useMessagePopup();
  const tableHeaders = ['username', 'email', 'role', ''];

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

  const initialSortedRow: SortingState = {
    sortKey: 'username',
    direction: 'asc',
  };

  return (
    <section>
      UsersPage
      {allUsers && (
        <Table
          tableData={allUsers}
          tableHeaders={tableHeaders}
          initialSortedRow={initialSortedRow}
          tableCaption={language.customersList}
          onDeleteUser={handleDeleteUser}
        />
      )}
    </section>
  );
};

export default UsersPage;
