import { SearchIcon } from 'lucide-react';

import { Button } from '../../components/ui/button.js';
import { Input } from '../../components/ui/input.js';
import { useSearchBar } from './hooks/useSearchBar.js';

type SearchBarProps = {
  handleSearchSubmit: (sld: string) => void;
  initialSearch?: string;
  isSearchDisabled: boolean;
};

export function SearchBar({
  handleSearchSubmit,
  isSearchDisabled,
  initialSearch = '',
}: SearchBarProps) {
  const {
    searchValue,
    searchInputRef,
    errorMessage,
    handleKeyDown,
    handleSearchInputChange,
    handleSearchAction,
  } = useSearchBar({ initialSearch, handleSubmit: handleSearchSubmit });

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleSearchAction();
      }}
    >
      <div className="flex gap-2 my-2 px-2">
        <div className="flex-grow relative">
          <span className="absolute left-3 top-3">
            <SearchIcon size="16" />
          </span>
          <Input
            value={searchValue}
            onChange={handleSearchInputChange}
            onKeyDown={handleKeyDown}
            ref={searchInputRef}
            aria-label={'Search name'}
            title={'Search name'}
            placeholder={'Search name'}
            translate="no"
            spellCheck="false"
            autoCorrect="false"
            autoComplete="false"
            autoCapitalize="false"
            data-testid="search-field"
            maxLength={63}
            minLength={1}
            aria-invalid={!!errorMessage}
            readOnly={isSearchDisabled}
            className="rounded-xl pr-20 ps-8"
          />
          {errorMessage ? (
            <p className="text-xs text-red-600 mt-1 text-left">{errorMessage}</p>
          ) : null}
          <Button
            aria-label="search name"
            className="rounded-xl absolute right-0 top-0 px-7 bg-[linear-gradient(95deg,_#5744e6_4.29%,_#8936ea_99.74%)]"
            disabled={isSearchDisabled}
            type="submit"
          >
            Search
          </Button>
        </div>
      </div>
    </form>
  );
}
