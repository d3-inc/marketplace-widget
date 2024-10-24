import { QueryClientProvider } from '@tanstack/react-query';
import { Buffer } from 'buffer';
import type { ReactNode } from 'react';
import React, { useEffect, useMemo } from 'react';
import { WagmiProvider } from 'wagmi';
import { getWagmiConfig } from '../config/evmConfig.js';
import queryClient from '../config/queryClient.js';
import type { WidgetConfig } from '../types/widget.js';

interface WidgetProviderProps {
  children: ReactNode;
  config: WidgetConfig;
}
// `@coinbase-wallet/sdk` uses `Buffer`
declare const window: {
  Buffer: unknown;
} & Window;

const WalletProvider: React.FC<WidgetProviderProps> = ({ children, config }) => {
  const wagmiConfig = useMemo(() => getWagmiConfig(config), [config]);
  useEffect(() => {
    // Ensure Buffer is globally available in browser
    if (typeof window.Buffer === 'undefined') {
      window.Buffer = Buffer;
    }
  }, []);
  return (
    <WagmiProvider config={wagmiConfig} reconnectOnMount={false}>
      <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
    </WagmiProvider>
  );
};

export const WidgetProvider: React.FC<WidgetProviderProps> = ({ children, config }) => {
  if (!config?.config.onPurchaseInit && !config?.config?.walletAddress) {
    return <WalletProvider config={config}>{children}</WalletProvider>;
  }

  return <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>;
};
