import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './app/store';
import ToastList from './components/toast/ToastList';
import CurrencyProvider from './features/currency/CurrencyProvider';
import './scss/style.scss';

const container = document.getElementById('root') as HTMLElement;
const root = ReactDOM.createRoot(container);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <CurrencyProvider>
        <App />
      </CurrencyProvider>
      <ToastList />
    </Provider>
  </React.StrictMode>,
);
