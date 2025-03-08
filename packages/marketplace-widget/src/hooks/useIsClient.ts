import { useEffect, useState } from 'react';

export function useIsClient() {
  const [isClient, setClient] = useState(() => false); // Ensure false on first render

  useEffect(() => {
    const timer = setTimeout(() => setClient(true), 0); // Delay update
    return () => clearTimeout(timer);
  }, []);

  return isClient;
}
