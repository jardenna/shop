import { FC } from 'react';
import Table from './components/table/Table';

const App: FC = () => (
  <div className="main-container">
    <header aria-label="primary">Header</header>
    <main>
      <Table />
    </main>
    <footer aria-label="primary">Footer</footer>
  </div>
);

export default App;
