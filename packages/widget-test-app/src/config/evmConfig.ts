import { getDefaultConfig } from '@rainbow-me/rainbowkit';
import { http } from 'wagmi';
import { base, mainnet, optimism, polygon, sepolia, shibariumTestnet } from 'wagmi/chains';
import { coreMainnet, coreTestnet, shibariumMainnet } from './evmCustomChains';

const walletConnectKey = import.meta.env.VITE_WALLET_CONNECT_PROJECT_ID;
const infuraKey = import.meta.env.VITE_INFURA_KEY;

export const wagmiConfig = getDefaultConfig({
  appName: 'D3 Marketplace widget app',
  projectId: walletConnectKey ?? 'PROJECT_ID',
  chains: [
    mainnet,
    polygon,
    optimism,
    base,
    coreTestnet,
    coreMainnet,
    shibariumMainnet,
    shibariumTestnet,
    sepolia,
  ],
  transports: {
    [sepolia.id]: http(`https://sepolia.infura.io/v3/${infuraKey}`),
  },
});
