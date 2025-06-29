// eslint-disable-next-line camelcase
import { createConfig, fallback, http, unstable_connector } from 'wagmi';
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
      [mainnet.id]: fallback([
        unstable_connector(injected),
        http('https://cloudflare-eth.com/'),
        http(),
      ]),
      [coreMainnet.id]: fallback([unstable_connector(injected), http()]),
      [shibariumMainnet.id]: fallback([unstable_connector(injected), http()]),
      [victionMainnet.id]: fallback([unstable_connector(injected), http()]),
      [polygon.id]: http(),
      [sepolia.id]: fallback([
        unstable_connector(injected),
        http('https://ethereum-sepolia-rpc.publicnode.com'),
        http(),
      ]),
      [polygonMumbai.id]: fallback([unstable_connector(injected), http()]),
      [victionTestnet.id]: fallback([unstable_connector(injected), http()]),
      [shibariumTestnet.id]: fallback([unstable_connector(injected), http()]),
      [coreTestnet.id]: fallback([unstable_connector(injected), http()]),
      [arbitrum.id]: fallback([unstable_connector(injected), http()]),
      [arbitrumSepolia.id]: fallback([unstable_connector(injected), http()]),
      [polygonAmoy.id]: fallback([unstable_connector(injected), http()]),
      [apechainMainnet.id]: fallback([unstable_connector(injected), http()]),
      [apechainTestnet.id]: fallback([unstable_connector(injected), http()]),
      [base.id]: fallback([unstable_connector(injected), http()]),
      [baseSepolia.id]: fallback([unstable_connector(injected), http()]),
    },
  });
};
