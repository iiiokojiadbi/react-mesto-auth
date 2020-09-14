import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './components/App';
import { ApiProvider } from './contexts/ApiContext';
import './index.css';
import api from './utils/Api';

ReactDOM.render(
  <React.StrictMode>
    <ApiProvider value={api}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ApiProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
