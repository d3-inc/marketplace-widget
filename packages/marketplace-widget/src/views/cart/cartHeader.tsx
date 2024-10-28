import { ChevronLeft } from 'lucide-react';
import { Button } from '../../components/ui/button.js';
import { cn } from '../../utils/twMerge.js';

type CartHeaderProps = {
  handleBack: () => void;
};

export const CartHeader = ({ handleBack }: CartHeaderProps) => {
  return (
    <div className="flex justify-between py-2 px-3">
      <div className="flex gap-2 items-center">
        <Button
          size="icon"
          className="px-2 h-7 border-none"
          variant={'outline'}
          aria-label={'back to search results'}
          onClick={handleBack}
        >
          <ChevronLeft />
        </Button>
        <h2 className={cn('text-lg font-bold text-left')}>Cart</h2>
      </div>
    </div>
  );
};
