import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import MessagePopupList from './components/messagePopup/MessagePopupList';
import SkipLink from './components/skipLinks/SkipLinks';
import './scss/style.scss';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <div className="main-container">
        <SkipLink />
        <App />
      </div>
      <MessagePopupList />
    </Provider>
  </React.StrictMode>,
);
