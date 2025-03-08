import { renderHook, waitFor } from '@testing-library/react';
import { useIsClient } from '../../src/hooks/useIsClient';

describe('useIsClient', () => {
  it('should return false initially', () => {
    const { result } = renderHook(() => useIsClient());
    expect(result.current).toBe(false);
  });

  it('should return true after effect runs', async () => {
    const { result } = renderHook(() => useIsClient());
    // Wait for state to update
    await waitFor(() => {
      expect(result.current).toBe(true);
    });
  });
});
