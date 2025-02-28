import { useShallow } from 'zustand/react/shallow';
import { Button } from '../../components/ui/button.js';
import { useStore } from '../../state/store/index.js';
import type { SearchResultRequestResponse } from '../../types/api.js';

type CheckoutButton = {
  searchResults?: SearchResultRequestResponse;
  handleStartCart: () => Promise<void>;
};

export function CheckoutButton({ searchResults, handleStartCart }: CheckoutButton) {
  const cart = useStore(useShallow((state) => state.cart));
  if (!searchResults?.pageItems?.length && !cart?.items?.length) return null;

  return (
    <div className="flex flex-col flex-shrink-0 gap-2 mt-auto px-3 py-2 w-full">
      <Button
        className="rounded-xl bg-[linear-gradient(95deg,_#5744e6_4.29%,_#8936ea_99.74%)]"
        disabled={!cart.items?.length}
        onClick={handleStartCart}
      >
        Checkout
      </Button>
    </div>
  );
}
