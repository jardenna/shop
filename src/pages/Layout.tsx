import { FC } from 'react';
import { Outlet } from 'react-router';

const Layout: FC = () => (
  <div className="container page-container">
    <header>
      <section className="hero">
        <div className="container">aa</div>
      </section>
    </header>
    <Outlet />
  </div>
);

export default Layout;
