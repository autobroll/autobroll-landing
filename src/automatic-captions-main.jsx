import { LanguageProvider } from "./i18n/LanguageProvider";
import React from 'react';
import ReactDOM from 'react-dom/client';
import AutomaticCaptionsPage from './AutomaticCaptionsPage';
import './styles/global.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <LanguageProvider>
      <AutomaticCaptionsPage />
    </LanguageProvider>
  </React.StrictMode>,
);
