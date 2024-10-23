import { D3Widget } from '@d3-inc/marketplace-widget';
// import { ConnectButton } from '@rainbow-me/rainbowkit';
// import { useAccount } from 'wagmi';
import './App.css';
// import { useCryptoCheckout } from './hooks/useCryptoCheckout';

const d3ApiKey = import.meta.env.VITE_D3_API_KEY;
const d3ApiEndpoint = import.meta.env.VITE_API_ENDPOINT;
const d3WidgetAppearance = import.meta.env.VITE_WIDGET_APPEARANCE;
const widgetTlds = import.meta.env.VITE_TLDS;
const walletConnectKey = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;

function App() {
  // const { address } = useAccount();
  // const { handleCryptoCheckout } = useCryptoCheckout();
  return (
    <>
      <div className="flex gap-3 items-center justify-center">
        <a href="https://vitejs.dev" target="_blank" rel="noreferrer">
          <img src={'https://d3.app/favicon.png'} className="logo" alt="Vite logo" />
        </a>
        <h2 style={{ fontWeight: 700 }}>D3 Marketplace Widget</h2>
      </div>
      {/* <ConnectButton /> */}
      <D3Widget
        appName="Widget Test app"
        config={{
          appearance: d3WidgetAppearance,
          apiKey: d3ApiKey,
          showRecommendations: true,
          // walletAddress: address,
          // onPurchaseInit: handleCryptoCheckout,
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
