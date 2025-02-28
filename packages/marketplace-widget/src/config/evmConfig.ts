import { createConfig, fallback, http } from 'wagmi';
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
  const infuraApiKey = config?.config.walletConfig?.infuraApiKey ?? '';

  const defaultAppMeta = {
    name: 'D3 Marketplace widget',
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
      [mainnet.id]: fallback([
        http(`https://mainnet.infura.io/v3/${infuraApiKey}`),
        http('https://cloudflare-eth.com/'),
      ]),
      [coreMainnet.id]: http(),
      [shibariumMainnet.id]: http(),
      [victionMainnet.id]: http(),
      [polygon.id]: http(),
      [sepolia.id]: fallback([
        http(`https://sepolia.infura.io/v3/${infuraApiKey}`),
        http('https://rpc2.sepolia.org/'),
      ]),
      [polygonMumbai.id]: http(),
      [victionTestnet.id]: http(),
      [shibariumTestnet.id]: http(),
      [coreTestnet.id]: http(),
      [arbitrum.id]: http(),
      [arbitrumSepolia.id]: http(),
      [polygonAmoy.id]: http(),
      [apechainMainnet.id]: http(),
      [apechainTestnet.id]: http(),
      [base.id]: http(),
      [baseSepolia.id]: http(),
    },
  });
};
