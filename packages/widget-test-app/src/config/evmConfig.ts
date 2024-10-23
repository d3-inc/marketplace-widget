import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { base, mainnet, optimism, polygon, shibariumTestnet } from 'wagmi/chains';
import { coreMainnet, coreTestnet, shibariumMainnet } from './evmCustomChains';

export const wagmiConfig = getDefaultConfig({
  appName: 'D3 Widget Test app',
  projectId: import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID,
  chains: [
    mainnet,
    polygon,
    optimism,
    base,
    coreTestnet,
    coreMainnet,
    shibariumMainnet,
    shibariumTestnet,
  ],
});
