import { FC } from 'react';
import { UserResponse } from '../app/api/apiTypes';
import { useGetAllUsersQuery } from '../features/admin/users/usersApiSlice';
import useLanguage from '../features/language/useLanguage';
import Table from '../newTable/Table';
import { SortingState } from '../newTable/use-table-sort-hook';

const Collections: FC = () => {
  const { language } = useLanguage();
  const { data: allUsers } = useGetAllUsersQuery();
  const tableHeaders: ('' | keyof UserResponse)[] = [
    'username',
    'email',
    'role',
    '',
  ];
  const initialFilterState = {
    username: '',
    email: '',
    role: '',
  };
  const initialSortedRow: SortingState = {
    sortKey: 'username',
    direction: 'asc',
  };

  return (
    <section>
      Collections
      {allUsers && (
        <Table
          initialFilterState={initialFilterState}
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
