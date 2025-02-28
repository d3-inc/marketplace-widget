import '@d3-inc/marketplace-widget/styles.css';
import '@rainbow-me/rainbowkit/styles.css';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
// import AppProviders from './providers/index';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <AppProviders> */}
    <App />
    {/* </AppProviders> */}
  </StrictMode>,
);
