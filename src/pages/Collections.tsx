import { FC } from 'react';
import { useGetAllUsersQuery } from '../features/admin/users/usersApiSlice';
import Table from '../newTable/Table';
import { SortingState } from '../newTable/use-table-sort-hook';

const Collections: FC = () => {
  const { data: allUsers } = useGetAllUsersQuery();
  const tableHeaders = ['username', 'email', 'role', ''];
  const initialSortedRow: SortingState = {
    sortKey: 'username',
    direction: 'asc',
  };
  return (
    <section>
      Collections
      {allUsers && (
        <Table
          tableData={allUsers}
          tableHeaders={tableHeaders}
          initialSortedRow={initialSortedRow}
        />
      )}
    </section>
  );
};

export default Collections;
