import type React from 'react';
import { useCallback, useEffect, useRef, useState } from 'react';

type UseSearchBarProps = {
  initialSearch?: string;
  isSearchDisabled?: boolean;
  handleSubmit: (sld: string) => void;
};

export function useSearchBar({
  initialSearch,
  isSearchDisabled = false,
  handleSubmit,
}: UseSearchBarProps) {
  const searchInputRef = useRef<HTMLInputElement | null>(null);
  const initialRenderRef = useRef(true);
  const [searchValue, setSearchValue] = useState(initialSearch);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const handleKeyDown = (event: React.KeyboardEvent<HTMLElement>) => {
    if (event.key === 'Enter' && searchValue?.length && !isSearchDisabled) {
      event.preventDefault();
      event.stopPropagation();
      handleSearchAction(searchValue);
    }
  };

  const handleSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const enteredText = e.target.value;
    setSearchValue(enteredText);
  };

  const handleSearchAction = useCallback(
    (search?: string) => {
      if (search?.startsWith('-') || search?.endsWith('-')) {
        setErrorMessage('Name cannot start or end with "-"');
        return;
      }
      if (search?.length) {
        const trimmedSld = search.replace(/\s+/g, '').split(/[.*]/)[0];
        setErrorMessage(null);
        handleSubmit(trimmedSld);
        setSearchValue(trimmedSld);
      }
    },
    [handleSubmit],
  );

  useEffect(() => {
    if (initialRenderRef.current && initialSearch?.length) {
      initialRenderRef.current = false;
      handleSearchAction(initialSearch);
    }
  }, [initialSearch, handleSearchAction]);

  return {
    searchValue,
    searchInputRef,
    errorMessage,
    setErrorMessage,
    handleKeyDown,
    handleSearchInputChange,
    handleSearchAction,
  };
}
