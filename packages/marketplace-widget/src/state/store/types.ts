import type { WidgetIntegrationMode } from 'src/types/widget.js';
import type { OnPurchaseInit, SearchResult } from '../../types/api.js';

export type WidgetSettings = {
  isCartViewOpen?: boolean;
  isOrderSuccess?: false;
  isWalletModalOpen?: false;
};

export type WidgetConfig = {
  apiKey?: string;
  apiEndpoint?: string | null;
  walletAddress?: `0x${string}` | string;
  onPurchaseInit?: null | OnPurchaseInit;
  tlds: string | string[];
  showRecommendations?: boolean;
  isWalletConnectEnabled?: boolean;
  integrationMode?: WidgetIntegrationMode | null;
};

export type Cart = {
  items?: SearchResult[];
  isCheckoutInProgress?: boolean;
};

export type ConnectWallet = {
  isConnectInitiated?: boolean;
  isConnectInProgress?: boolean;
  isEvmLoaded?: boolean;
  evmWallet?: `0x${string}` | null;
};
