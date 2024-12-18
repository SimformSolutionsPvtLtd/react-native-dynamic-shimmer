import { useEffect, useState } from 'react';

/**
 * Custom hook `useLoading` that simulates a loading state for a given duration.
 *
 * @param {number} [duration=3000] - Duration in milliseconds for which the loading state remains `true`.
 * Defaults to 3000 milliseconds (3 seconds) if not provided.
 *
 * @returns {boolean} - A boolean indicating whether the component is in a loading state (`true` initially,
 * changes to `false` after the specified duration).
 */
const useLoading = (duration: number = 3000): boolean => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return isLoading;
};

export default useLoading;
