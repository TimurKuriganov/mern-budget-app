import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthContextProvider } from './context/AuthContext';
import { BudgetsContextProvider } from './context/BudgetContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <BudgetsContextProvider>
        <App />
      </BudgetsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

