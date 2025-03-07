import { FC } from 'react';
import Icon, { IconName } from './components/icons/Icon';

const App: FC = () => (
  <div className="main-container">
    <nav>
      <div className="container">
        <div className="logo">
          <Icon iconName={IconName.Logo} title="Logo" />
        </div>
      </div>
    </nav>
    <header aria-label="primary">
      <section className="hero">
        <div className="container">aa</div>
      </section>
    </header>
    <main>main</main>
    <footer aria-label="primary">Footer</footer>
  </div>
);

export default App;
