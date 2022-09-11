/* eslint-disable import/prefer-default-export */
import { useState } from 'react';

export const useFetching = (callback) => {
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(false);

  const fetching = async (...args) => {
    try {
      setIsLoading(true);
      await callback(...args);
    } catch (e) {
      setError(e.message);
    } finally {
      setIsLoading(false);
    }
  };

  return [fetching, isLoading, error];
};
