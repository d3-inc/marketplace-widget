import { useShallow } from 'zustand/react/shallow';
import { Toaster } from '../../components/ui/toaster.js';
import { D3_DEVELOPER_DASHBOARD_LINK } from '../../config/constants.js';
import { useStore } from '../../state/store/index.js';
import { CartView } from '../cart/index.js';
import { ConnectWallet } from '../connectWallet/index.js';
import { Search } from '../search/index.js';

const WidgetLayout = () => {
  const widgetConfig = useStore(useShallow((state) => state.widgetConfig));
  const widgetSettings = useStore(useShallow((state) => state.widgetSettings));

  // TO-DO: Add API key validation
  if (!widgetConfig.tlds) {
    return (
      <div
        className={
          'flex flex-col w-[94svw] h-[90dvh] md:h-[560px] max-h:[90dvh] md:max-h-[75svh] max-w-[425px] border bg-primary-foreground rounded-xl absolute bottom-16 right-0 overflow-auto shadow-xl dark:border dark:border-interactive-border'
        }
      >
        <p className="text-xs text-red-600 mt-4 p-3 text-left">
          Please configure a list of valid tlds for this search widget. You can get a list of valid
          tlds from{' '}
          <a href={D3_DEVELOPER_DASHBOARD_LINK} target="_blank" rel="noreferrer">
            D3 Dashboard
          </a>
          .
        </p>
      </div>
    );
  }
  const isWalletIntegrationMode =
    !widgetConfig.onPurchaseInit && !widgetConfig?.walletAddress?.length;
  return (
    <div
      className={
        'flex flex-col w-[94svw] h-[calc(90dvh_-_50px)] md:h-[calc(60dvh)] max-h-[calc(90dvh_-_50px)]  max-w-[425px] bg-primary-foreground rounded-xl absolute bottom-16 right-0 overflow-auto shadow-xl border dark:border-none dark:bg-[#0B0B23] dark:border-interactive-border'
      }
    >
      {isWalletIntegrationMode ? <ConnectWallet /> : null}
      {widgetSettings.isCartViewOpen ? <CartView /> : <Search />}
      <Toaster />
    </div>
  );
};

export default WidgetLayout;
