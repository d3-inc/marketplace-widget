import { create } from 'zustand';
import { combine, devtools } from 'zustand/middleware';

import { isProductionEnv } from '../../config/appConfig.js';
import { connectWallet, initialCart, widgetConfig, widgetSettings } from './defaultState.js';
import type { Cart, ConnectWallet, WidgetConfig, WidgetSettings } from './types.js';

const createStore = combine(
  {
    widgetSettings: { ...widgetSettings },
    cart: { ...initialCart },
    widgetConfig: { ...widgetConfig },
    connectWallet: { ...connectWallet },
  },
  (set) => ({
    setWidgetSettings: (newState: WidgetSettings) =>
      set((prevState) => ({
        widgetSettings: {
          ...prevState.widgetSettings,
          isCartViewOpen: newState.isCartViewOpen ?? prevState?.widgetSettings?.isCartViewOpen,
          isOrderSuccess: newState.isOrderSuccess ?? prevState?.widgetSettings?.isOrderSuccess,
          isWalletModalOpen:
            newState.isWalletModalOpen ?? prevState?.widgetSettings?.isWalletModalOpen,
          lastSearch: newState.lastSearch ?? prevState?.widgetSettings?.lastSearch,
        },
      })),
    setWidgetConfig: (newState: WidgetConfig) =>
      set((prevState) => ({
        widgetConfig: {
          ...prevState.widgetConfig,
          apiKey: newState.apiKey ?? prevState?.widgetConfig?.apiKey,
          walletAddress: newState.walletAddress ?? prevState?.widgetConfig?.walletAddress,
          onPurchaseInit: newState.onPurchaseInit ?? prevState?.widgetConfig?.onPurchaseInit,
          tlds: newState.tlds ?? prevState?.widgetConfig?.tlds,
          apiEndpoint: newState.apiEndpoint ?? prevState?.widgetConfig?.apiEndpoint,
          integrationMode: newState.integrationMode ?? prevState?.widgetConfig?.integrationMode,
          isWalletConnectEnabled:
            newState.isWalletConnectEnabled ?? prevState?.widgetConfig?.isWalletConnectEnabled,
          showRecommendations:
            newState.showRecommendations ?? prevState?.widgetConfig?.showRecommendations,
        },
      })),
    setCart: (newState: Cart) =>
      set((prevState) => ({
        cart: {
          ...prevState.cart,
          isCheckoutInProgress:
            newState.isCheckoutInProgress ?? prevState?.cart?.isCheckoutInProgress,
          items: newState.items ?? prevState?.cart?.items,
        },
      })),
    setConnectWallet: (newState: ConnectWallet) =>
      set((prevState) => ({
        connectWallet: {
          ...prevState.connectWallet,
          isConnectInitiated:
            newState.isConnectInitiated ?? prevState?.connectWallet?.isConnectInitiated,
          isEvmLoaded: newState.isEvmLoaded ?? prevState?.connectWallet?.isEvmLoaded,
          evmWallet: newState.evmWallet ?? prevState?.connectWallet?.evmWallet,
          isConnectInProgress:
            newState.isConnectInProgress ?? prevState?.connectWallet?.isConnectInProgress,
        },
      })),
    resetCart: () =>
      set({
        cart: { ...initialCart },
      }),
    resetState: () =>
      set((prevState) => ({
        connectWallet: { ...connectWallet },
        widgetSettings: { ...prevState.widgetSettings, lastSearch: '' },
      })),
  }),
);
export const useStore = isProductionEnv ? create(createStore) : create(devtools(createStore));
