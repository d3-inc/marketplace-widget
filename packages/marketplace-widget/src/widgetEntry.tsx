'use client';
import { useIsClient } from './hooks/useIsClient.js';
import { WidgetProvider } from './providers/widgetProviders.js';
import type { WidgetConfig } from './types/widget.js';
import { Widget } from './views/index.js';

export const WidgetEntry = ({ config, appName }: WidgetConfig) => {
  const isClient = useIsClient();
  if (!isClient) return null;
  return (
    <WidgetProvider config={{ config, appName }}>
      <Widget config={config} />
    </WidgetProvider>
  );
};
