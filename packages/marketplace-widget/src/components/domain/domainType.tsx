import { GlobeIcon, WalletCardsIcon } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipPortal, TooltipTrigger } from '../ui/tooltipComponent.js';

import type { SearchResult } from '../../types/api.js';
import { getIsIcannDomain } from '../../utils/nameTokens.js';

export const DomainType = ({ searchResult }: { searchResult: SearchResult }) => {
  const isIcannDomain = getIsIcannDomain(searchResult);
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <span>{isIcannDomain ? <GlobeIcon size={18} /> : <WalletCardsIcon size={18} />}</span>
      </TooltipTrigger>
      <TooltipPortal>
        <TooltipContent className="tooltip-content">
          {isIcannDomain ? 'Real Domain' : 'Web3 name'}
        </TooltipContent>
      </TooltipPortal>
    </Tooltip>
  );
};
