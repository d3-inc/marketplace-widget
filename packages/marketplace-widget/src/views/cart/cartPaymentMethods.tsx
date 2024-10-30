import type { Dispatch, SetStateAction } from 'react';
import { useShallow } from 'zustand/react/shallow';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../../components/ui/select.js';
import { useStore } from '../../state/store/index.js';
import type { PaymentOption, PaymentOptionRequestResponse } from '../../types/api.js';
import { cn } from '../../utils/twMerge.js';

type CartPaymentMethodsProps = {
  selectedPaymentMethod: PaymentOption | null;
  setSelectedPaymentMethod: Dispatch<SetStateAction<PaymentOption | null>>;
  isPaymentOptionsLoading: boolean;
  paymentOptions: PaymentOptionRequestResponse;
};

export const CartPaymentMethods = ({
  selectedPaymentMethod,
  setSelectedPaymentMethod,
  isPaymentOptionsLoading,
  paymentOptions,
}: CartPaymentMethodsProps) => {
  const cart = useStore(useShallow((state) => state.cart));
  const paymentMethods = paymentOptions?.options;

  return (
    <div className="flex justify-between items-center gap-2 px-3 mb-1">
      <h3 className={cn('text-md font-semibold text-left')}>Payment Method</h3>
      <div>
        <Select
          value={selectedPaymentMethod?.chainName + ',' + selectedPaymentMethod?.symbol}
          onValueChange={(updatedValue) => {
            const newMethod = paymentMethods?.find(
              (item) =>
                item.chainName?.toLowerCase() + ',' + item?.symbol?.toLowerCase() ===
                updatedValue?.toLowerCase(),
            );
            if (newMethod) {
              setSelectedPaymentMethod(newMethod);
            }
          }}
        >
          <SelectTrigger className="w-[250px] rounded-xl border-black dark:border-white">
            <SelectValue placeholder="Select Payment" aria-label="select payment method" />
          </SelectTrigger>
          <SelectContent>
            {paymentMethods?.map((payment) => (
              <SelectItem
                disabled={isPaymentOptionsLoading || !cart?.items?.length}
                key={payment.symbol + payment.tokenAddress}
                value={payment.chainName + ',' + payment.symbol}
              >
                <span className="flex gap-2 items-center justify-center">
                  <img
                    className="object-cover object-center h-5"
                    src={payment.icon}
                    alt={payment.symbol}
                  />
                  <span className="flex items-center gap-1">
                    <strong>{payment.symbol}</strong>
                    <span className="text-xs">
                      (
                      {payment.chainName?.length > 15
                        ? `${payment.chainName.slice(0, 13)}...`
                        : payment.chainName}
                      )
                    </span>
                  </span>
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};
