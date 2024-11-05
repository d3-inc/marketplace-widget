import { D3Widget } from '@d3-inc/marketplace-widget';
import './App.css';

const d3ApiKey = import.meta.env.VITE_D3_API_KEY;
const d3ApiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const d3WidgetAppearance = import.meta.env.VITE_WIDGET_APPEARANCE ?? 'light';
const widgetTlds = import.meta.env.VITE_TLDS ?? 'shib,core';
const walletConnectKey = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

function App() {
  return (
    <>
      <div className="flex gap-3 items-center justify-center flex-col">
        <a
          href="https://docs.d3.app/channel-partner-integrations/d3-embed"
          target="_blank"
          rel="noreferrer"
        >
          <img src={'https://d3.app/favicon.png'} className="logo" alt="Vite logo" />
        </a>
        <h2 style={{ fontWeight: 500 }}>D3 Marketplace Widget Demo</h2>
      </div>
      <D3Widget
        appName="Widget Test app"
        config={{
          appearance: d3WidgetAppearance,
          apiKey: d3ApiKey,
          showRecommendations: true,
          tlds: widgetTlds,
          apiEndpoint: d3ApiEndpoint,
          walletConfig: {
            walletConnectKey,
          },
        }}
      />
    </>
  );
}

export default App;
