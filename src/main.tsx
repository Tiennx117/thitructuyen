import React from 'react'
import ReactDOM from 'react-dom/client'
import { disableReactDevTools } from 'shared/utils/disableReactDevTools';
import App from './App'
import './index.css'

import i18n from './translation/i18n';
import { I18nextProvider } from 'react-i18next';

if(import.meta.env.MODE === "production"){
  disableReactDevTools();
}
ReactDOM.createRoot(document.getElementById('root')!).render(
  //<React.StrictMode>
  <I18nextProvider i18n={i18n}>
    <App />
  </I18nextProvider>
  //</React.StrictMode>
)
