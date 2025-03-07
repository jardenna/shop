import { FC } from 'react';
import Icon, { IconName } from '../components/icons/Icon';
import Logo from '../components/icons/Logo';
import Nav from '../layout/nav/Nav';

const Home: FC = () => (
  <div className="main-container">
    <header aria-label="primary">
      <nav>
        <div className="container">
          <Logo />
          <Nav />
          <div>
            <Icon iconName={IconName.Search} title="" />
            <Icon iconName={IconName.User} title="" />
            <Icon iconName={IconName.ShoppingBack} title="" />
          </div>
        </div>
      </nav>
      <section className="hero">
        <div className="container">
          <h1>Special Fashion Sale</h1>
          <div>
            Upgrade your wardrobe with exclusive deals! For a limited time,
            enjoy incredible discounts on the latest fashion trends.
          </div>
          <button type="button">Shop now</button>
        </div>
      </section>
    </header>
    <main>main</main>
    <footer aria-label="primary">Footer</footer>
  </div>
);

export default Home;
