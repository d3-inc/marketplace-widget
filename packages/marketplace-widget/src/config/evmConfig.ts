import { createConfig, fallback, http, unstable_connector as unstableConnector } from 'wagmi';
import {
  arbitrum,
  arbitrumSepolia,
  base,
  baseSepolia,
  mainnet,
  polygon,
  polygonAmoy,
  polygonMumbai,
  sepolia,
} from 'wagmi/chains';
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors';
import type { WidgetConfig } from '../types/widget.js';

import {
  apechainMainnet,
  apechainTestnet,
  coreMainnet,
  coreTestnet,
  shibariumMainnet,
  shibariumTestnet,
  victionMainnet,
  victionTestnet,
} from './evmDefaultChains.js';

const DEFAULT_POLLING_INTERVAL = 8_000;

// Allow test networks in non-production environments
export const chainsList = [
  sepolia,
  victionTestnet,
  coreTestnet,
  shibariumTestnet,
  polygonMumbai,
  polygon,
  victionMainnet,
  shibariumMainnet,
  coreMainnet,
  arbitrumSepolia,
  polygonAmoy,
  apechainMainnet,
  apechainTestnet,
  base,
  baseSepolia,
];

// Set up wagmi config
export const getWagmiConfig = (config: WidgetConfig) => {
  const walletConnectKey = config?.config.walletConfig?.walletConnectKey ?? '';
  const defaultAppMeta = {
    name: 'D3 Widget',
    description: 'Official Identity Service for Top web3 communities',
    url: window.location.origin,
    icons: ['https://d3.app/favicon.png'],
  };
  return createConfig({
    chains: [mainnet, ...chainsList],
    connectors: [
      coinbaseWallet({
        appName: config?.appName || defaultAppMeta.name,
        appLogoUrl: defaultAppMeta.icons[0],
        darkMode: true,
        ...config.config.walletConfig?.coinbase,
      }),
      ...(config.config?.walletConfig?.walletConnectKey
        ? [
            walletConnect({
              projectId: walletConnectKey,
              qrModalOptions: {
                themeMode: 'dark',
              },
              showQrModal: true,
              metadata: {
                ...defaultAppMeta,
                name: config.appName || defaultAppMeta.name,
              },
              ...config.config.walletConfig?.walletConnect,
            }),
          ]
        : []),
      injected({ shimDisconnect: false }),
    ],
    ssr: true,
    syncConnectedChain: true,
    multiInjectedProviderDiscovery: true,
    cacheTime: DEFAULT_POLLING_INTERVAL,
    pollingInterval: DEFAULT_POLLING_INTERVAL,
    transports: {
      [mainnet.id]: fallback([unstableConnector(injected), http('https://eth.drpc.org'), http()]),
      [coreMainnet.id]: fallback([unstableConnector(injected), http()]),
      [shibariumMainnet.id]: fallback([unstableConnector(injected), http()]),
      [victionMainnet.id]: fallback([unstableConnector(injected), http()]),
      [polygon.id]: http(),
      [sepolia.id]: fallback([
        unstableConnector(injected),
        http('https://ethereum-sepolia-rpc.publicnode.com'),
        http(),
      ]),
      [polygonMumbai.id]: fallback([unstableConnector(injected), http()]),
      [victionTestnet.id]: fallback([unstableConnector(injected), http()]),
      [shibariumTestnet.id]: fallback([unstableConnector(injected), http()]),
      [coreTestnet.id]: fallback([unstableConnector(injected), http()]),
      [arbitrum.id]: fallback([unstableConnector(injected), http()]),
      [arbitrumSepolia.id]: fallback([unstableConnector(injected), http()]),
      [polygonAmoy.id]: fallback([unstableConnector(injected), http()]),
      [apechainMainnet.id]: fallback([unstableConnector(injected), http()]),
      [apechainTestnet.id]: fallback([unstableConnector(injected), http()]),
      [base.id]: fallback([unstableConnector(injected), http()]),
      [baseSepolia.id]: fallback([unstableConnector(injected), http()]),
    },
  });
};
