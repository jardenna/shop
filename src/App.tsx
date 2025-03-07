import { FC } from 'react';
import Icon, { IconName } from './components/icons/Icon';

const App: FC = () => (
  <div className="main-container">
    <header aria-label="primary">
      <nav>
        <div className="container">
          <div className="logo">
            <Icon iconName={IconName.Logo} title="Logo" />
          </div>
          <div className="nav-container">HOME COLLECTION ABOUT CONTACT</div>
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

export default App;
