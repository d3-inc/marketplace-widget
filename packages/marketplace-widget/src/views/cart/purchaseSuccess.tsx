import { CheckCircle2, ExternalLink, Search } from 'lucide-react';
import { Button } from '../../components/ui/button.js';
import { cn } from '../../utils/twMerge.js';

type PurchaseSuccessProps = {
  handleSearch: () => void;
};

export const PurchaseSuccess = ({ handleSearch }: PurchaseSuccessProps) => {
  return (
    <div className="flex justify-between my-auto flex-col">
      <div className="flex flex-col gap-2 items-center my-4">
        <h2 className={cn('text-lg font-bold flex gap-2')}>
          <CheckCircle2 size={30} className="text-green-500" />
          Order Successful
        </h2>
        <p>Thank you for your order. We are currently processing it.</p>
      </div>
      <div className="flex gap-2 items-center justify-center">
        <Button variant="secondary" onClick={handleSearch} aria-label={'back to search'}>
          <Search className="mr-2 h-4 w-4" />
          Browse Names
        </Button>
        <Button
          className="bg-[linear-gradient(95deg,_#5744e6_4.29%,_#8936ea_99.74%)]"
          onClick={() => window.open('https://d3.app/login')}
          aria-label={'view assets'}
        >
          <ExternalLink className="mr-2 h-4 w-4" />
          View Assets
        </Button>
      </div>
    </div>
  );
};
