import type { Cart, ConnectWallet, WidgetConfig, WidgetSettings } from './types.js';

export const widgetSettings: WidgetSettings = {
  isCartViewOpen: false,
  isOrderSuccess: false,
  isWalletModalOpen: false,
};

export const initialCart: Cart = {
  items: [],
  isCheckoutInProgress: false,
};

export const widgetConfig: WidgetConfig = {
  apiKey: '',
  walletAddress: '',
  onPurchaseInit: null,
  tlds: '',
  apiEndpoint: null,
  showRecommendations: false,
  isWalletConnectEnabled: false,
  integrationMode: null,
};

export const connectWallet: ConnectWallet = {
  isConnectInitiated: false,
  isConnectInProgress: false,
  isEvmLoaded: false,
  evmWallet: null,
};
