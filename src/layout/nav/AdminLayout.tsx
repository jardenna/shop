import { FC } from 'react';
import { Outlet } from 'react-router';

const AdminLayout: FC = () => (
  <div>
    <div>
      <aside>Nav</aside>
    </div>
    <Outlet />
  </div>
);

export default AdminLayout;
