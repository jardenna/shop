import { FC } from 'react';
import UserTable from '../components/table/UserTable';
import { useGetAllUsersQuery } from '../features/admin/users/usersApiSlice';
import ProductPrice from '../features/currency/components/ProductPrice';

const About: FC = () => {
  const tableHeaders = ['username', 'email', 'role', ''];
  const { data: allUsers } = useGetAllUsersQuery();
  return (
    <section>
      {allUsers && (
        <UserTable tableHeaders={tableHeaders} tableData={allUsers} />
      )}
      <ProductPrice price={10200} />
    </section>
  );
};

export default About;
