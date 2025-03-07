import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './scss/style.scss';
import { Provider } from 'react-redux';
import { store } from './app/store';
import MessagePopupList from './components/messagePopup/MessagePopupList';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <MessagePopupList />
    </Provider>
  </React.StrictMode>,
);
