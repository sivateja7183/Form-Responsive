import { useCallback, useState } from 'react';

export const useAsync = (fn) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const run = useCallback(
    async (...args) => {
      setLoading(true);
      setError('');
      try {
        return await fn(...args);
      } catch (err) {
        setError(err?.response?.data?.message || err.message || 'Request failed');
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fn]
  );

  return { run, loading, error };
};
