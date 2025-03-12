import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import MessagePopupList from './components/messagePopup/MessagePopupList';
import CurrencySwitcher from './features/currency/components/CurrencySwitcher';
import CurrencyProvider from './features/currency/CurrencyProvider';
import './scss/style.scss';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyProvider>
        <CurrencySwitcher />
        <App />
      </CurrencyProvider>

      <MessagePopupList />
    </Provider>
  </React.StrictMode>,
);
