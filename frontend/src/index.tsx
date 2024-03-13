import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { WorkoutsContextProvider } from './context/workoutContext'
import { AuthContextProvider } from './context/AuthContext'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <AuthContextProvider>
      <WorkoutsContextProvider>
          <App />
      </WorkoutsContextProvider>
    </AuthContextProvider>
  </React.StrictMode>
);

