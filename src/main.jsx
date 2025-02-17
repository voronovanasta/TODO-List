import { HashRouter } from 'react-router-dom';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { StrictMode } from 'react';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <HashRouter basename={'/TODO-List'}>
      <App />
    </HashRouter>
  </StrictMode>
);
