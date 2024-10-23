'use client';
import { lazy, Suspense, useCallback, useEffect, useState } from 'react';
import { TooltipProvider } from '../components/ui/tooltipComponent.js';
import { D3_DEVELOPER_DASHBOARD_LINK } from '../config/constants.js';
import { ThemeProvider, useTheme } from '../providers/themeProvider.js';
import { useStore } from '../state/store/index.js';
import { WidgetIntegrationMode, type WidgetConfig } from '../types/widget.js';
import { WidgetButton } from './widgetButton/index.js';
import { FallbackLoader } from './widgetLayout/fallbackLoader.js';

const WidgetLayout = lazy(() => import('./widgetLayout/index.js'));

export const Widget = ({ config }: WidgetConfig) => {
  if (!config.apiKey) {
    throw new Error(
      `API Key is missing. Please visit <a href=${D3_DEVELOPER_DASHBOARD_LINK} target='_blank'>D3 dashboard</a> to get an API key.`,
    );
  }

  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const setWidgetConfig = useStore(useCallback((state) => state.setWidgetConfig, []));
  const { setTheme } = useTheme();

  useEffect(() => {
    if (config.apiKey) {
      setWidgetConfig({
        apiKey: config.apiKey,
        apiEndpoint: config.apiEndpoint,
        walletAddress: config.walletAddress,
        onPurchaseInit: config.onPurchaseInit,
        showRecommendations: config.showRecommendations,
        tlds: config.tlds,
        isWalletConnectEnabled: !!config?.walletConfig?.walletConnectKey,
        integrationMode:
          !config.onPurchaseInit && !config?.walletAddress?.length
            ? WidgetIntegrationMode.WALLET
            : WidgetIntegrationMode.CALLBACK,
      });
    }
    if (config?.appearance) {
      setTheme(config.appearance);
    }
  }, [setWidgetConfig, config, setTheme]);

  return (
    <ThemeProvider defaultTheme={config.appearance || 'auto'}>
      <div className="d3">
        <TooltipProvider>
          <WidgetButton
            isWidgetOpen={isWidgetOpen}
            onClick={() => setIsWidgetOpen((old) => !old)}
          />
          {isWidgetOpen ? (
            <Suspense fallback={<FallbackLoader />}>
              <WidgetLayout />
            </Suspense>
          ) : null}
        </TooltipProvider>
      </div>
    </ThemeProvider>
  );
};
