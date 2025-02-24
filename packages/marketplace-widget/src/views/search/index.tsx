import clsx from 'clsx';
import { useShallow } from 'zustand/react/shallow';
import { ScrollArea } from '../../components/ui/scrollArea.js';
import { useStore } from '../../state/store/index.js';
import { WidgetIntegrationMode } from '../../types/widget.js';
import { cn } from '../../utils/twMerge.js';
import { CheckoutButton } from './checkoutButton.js';
import { useSearch } from './hooks/useSearch.js';
import { RecommendationsResults } from './recommendationsResults.js';
import { SearchBar } from './searchBar.js';
import { SearchResults } from './searchResults.js';

export const Search = () => {
  const {
    searchResults,
    searchQueryParams,
    isLoading,
    isError,
    error,
    handleSearchSubmit,
    handlePaymentMethods,
    recommendationsResults,
    isRecommendationError,
    isRecommendationLoading,
    recommendationRequestError,
  } = useSearch();
  const widgetConfig = useStore(useShallow((state) => state.widgetConfig));
  const isWalletIntegrationMode = widgetConfig?.integrationMode
    ? widgetConfig?.integrationMode === WidgetIntegrationMode.WALLET
    : false;

  return (
    <div className="flex flex-col gap-y-2 flex-grow relative h-full">
      <SearchBar
        isSearchDisabled={isLoading}
        handleSearchSubmit={handleSearchSubmit}
        initialSearch={searchQueryParams.sld}
      />
      <div id="search-results" className={cn('flex flex-col flex-grow gap-3 h-full')}>
        <ScrollArea
          className={clsx(
            'min-h-[100px]',
            'max-h-[-webkit-fill-available]',
            isWalletIntegrationMode
              ? 'md:h-[calc(60dvh-200px)] h-[calc(90dvh-245px)]'
              : 'md:h-[calc(60dvh-140px)] h-[calc(90dvh-140px)]',
          )}
        >
          <div className="px-3">
            <SearchResults
              searchResults={searchResults}
              isLoading={isLoading}
              isError={isError}
              error={error}
              searchTerm={searchQueryParams.sld}
            />
            {widgetConfig?.showRecommendations ? (
              <RecommendationsResults
                recommendationsResults={recommendationsResults}
                isLoading={isRecommendationLoading}
                isError={isRecommendationError}
                error={recommendationRequestError}
                searchTerm={searchQueryParams.sld}
                searchResults={searchResults?.pageItems}
              />
            ) : null}
          </div>
        </ScrollArea>
      </div>
      <CheckoutButton searchResults={searchResults} handleStartCart={handlePaymentMethods} />
    </div>
  );
};
