import { Loader2 } from 'lucide-react';
import { useCallback } from 'react';
import { useShallow } from 'zustand/react/shallow';
import { ContactForm } from '../../components/contactForm/index.js';
import { useStore } from '../../state/store/index.js';
import { WidgetIntegrationMode } from '../../types/widget.js';
import { cn } from '../../utils/twMerge.js';
import { CartHeader } from './cartHeader.js';
import { CartItems } from './cartItems.js';
import { CartPaymentMethods } from './cartPaymentMethods.js';
import { useCheckout } from './hooks/useCheckout.js';
import { PurchaseSuccess } from './purchaseSuccess.js';

export const CartView = () => {
  const setWidgetSettings = useStore(useCallback((state) => state.setWidgetSettings, []));
  const cart = useStore(useShallow((state) => state.cart));
  const handleSearchView = () => {
    setWidgetSettings({ isCartViewOpen: false });
  };
  const widgetConfig = useStore(useShallow((state) => state.widgetConfig));
  const isWalletIntegrationMode = widgetConfig?.integrationMode
    ? widgetConfig?.integrationMode === WidgetIntegrationMode.WALLET
    : false;
  const {
    selectedPaymentMethod,
    setSelectedPaymentMethod,
    handleStartCheckout,
    checkoutState,
    setCheckoutState,
    startCheckoutOrder,
    paymentOptions,
    isPaymentOptionsError,
    isPaymentOptionsLoading,
    paymentOptionsError,
    isSwitchNetworkInProgress,
    contactInfo,
    setContactInfo,
  } = useCheckout();

  if (checkoutState.isOrderSuccess) {
    return (
      <div className="px-3 flex flex-col gap-y-2 flex-grow">
        <PurchaseSuccess handleSearch={handleSearchView} />
      </div>
    );
  }
  if (isPaymentOptionsLoading) {
    return (
      <div className="px-3 flex items-center justify-center my-5">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-y-2 flex-grow">
      <CartHeader handleBack={handleSearchView} />
      {contactInfo?.isFormOpen ? (
        <div
          id="contact-form-container"
          className={cn('flex flex-col flex-grow gap-3 overflow-auto pb-2')}
        >
          <ContactForm
            setContactInfo={setContactInfo}
            isWalletIntegrationMode={isWalletIntegrationMode}
            handleStartCheckout={handleStartCheckout}
            isButtonDisabled={
              startCheckoutOrder.isPending ||
              checkoutState.isTransactionInProgress ||
              isPaymentOptionsError ||
              isPaymentOptionsLoading ||
              isSwitchNetworkInProgress
            }
          />
        </div>
      ) : (
        <>
          {cart.items?.length && paymentOptions?.options?.length ? (
            <CartPaymentMethods
              selectedPaymentMethod={selectedPaymentMethod}
              setSelectedPaymentMethod={setSelectedPaymentMethod}
              paymentOptions={paymentOptions}
              isPaymentOptionsLoading={isPaymentOptionsLoading}
            />
          ) : null}
          <CartItems
            selectedPaymentMethod={selectedPaymentMethod}
            handleStartCheckout={handleStartCheckout}
            checkoutState={checkoutState}
            setCheckoutState={setCheckoutState}
            startCheckoutOrder={startCheckoutOrder}
            paymentOptions={paymentOptions}
            isPaymentOptionsLoading={isPaymentOptionsLoading}
            isPaymentOptionsError={isPaymentOptionsError}
            paymentOptionsError={paymentOptionsError}
            isSwitchNetworkInProgress={isSwitchNetworkInProgress}
          />
        </>
      )}
    </div>
  );
};
