import type {
  CoinbaseWalletParameters,
  MetaMaskParameters,
  WalletConnectParameters,
} from '@wagmi/connectors';
import type { OnPurchaseInit } from './api';

export type WidgetTheme = 'dark' | 'light' | 'auto';
export enum WidgetIntegrationMode {
  'CALLBACK',
  'WALLET',
}

export type WidgetConfig = {
  /**
   * @param appName - Your app name, which will be used in connecting wallet and transactions
   */
  appName?: string;

  config: {
    /**
     * @param apiKey - The API key for accessing the widget's search and purchase functionality. Without this key, the widget won't function properly
     * In case of incomplete permissions, some functionality might not work in the widget. Make sure to configure the key with correct permissions in the dashboard
     */
    apiKey: string;

    /**
     * @param apiEndpoint - The API endpoint (e.g. https://api-public.d3.app) to use for the widget functionality. If no endpoint is provided, the default public endpoint will be used
     */
    apiEndpoint?: string;

    /**
     * @param tlds - A valid tld, which will be used for search and purchase. You can provide a string or an array of strings
     */
    tlds: string | string[];

    walletAddress?: `0x${string}` | string;

    onPurchaseInit?: OnPurchaseInit;
    /**
     * The theme applied to the widget - 'light', 'dark' or 'auto'.
     */
    appearance?: WidgetTheme;

    /**
     * @param showRecommendations - This can be used to show the AI recommendations results based on the search.
     */
    showRecommendations?: boolean;

    /**
     * @param walletConfig - a configuration object for wagmi config.
     */
    walletConfig?: {
      walletConnectKey?: string;
      infuraApiKey?: string;
      walletConnect?: WalletConnectParameters;
      coinbase?: CoinbaseWalletParameters;
      metaMask?: MetaMaskParameters;
    };
  };
};
