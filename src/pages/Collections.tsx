import { FC } from 'react';
import { useGetAllUsersQuery } from '../features/admin/users/usersApiSlice';
import useLanguage from '../features/language/useLanguage';
import Table from '../newTable/Table';
import { SortingState } from '../newTable/use-table-sort-hook';

const Collections: FC = () => {
  const { language } = useLanguage();
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
          tableCaption={language.customersList}
        />
      )}
    </section>
  );
};

export default Collections;
