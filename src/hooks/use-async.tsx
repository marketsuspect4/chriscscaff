import { useState, useCallback, useRef, useEffect } from 'react';
import { toast } from '@/hooks/use-toast';

interface UseAsyncOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
  showErrorToast?: boolean;
  showSuccessToast?: boolean;
  successMessage?: string;
}

interface UseAsyncReturn<T, Args extends unknown[]> {
  execute: (...args: Args) => Promise<T | undefined>;
  data: T | null;
  error: Error | null;
  isLoading: boolean;
  reset: () => void;
}

export function useAsync<T, Args extends unknown[] = []>(
  asyncFunction: (...args: Args) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, Args> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const mountedRef = useRef(true);

  const {
    onSuccess,
    onError,
    showErrorToast = true,
    showSuccessToast = false,
    successMessage = 'Operation completed successfully',
  } = options;

  useEffect(() => {
    return () => {
      mountedRef.current = false;
    };
  }, []);

  const execute = useCallback(
    async (...args: Args): Promise<T | undefined> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        
        if (!mountedRef.current) return undefined;

        setData(result);
        setIsLoading(false);

        if (showSuccessToast) {
          toast({
            title: 'Success',
            description: successMessage,
          });
        }

        onSuccess?.(result);
        return result;
      } catch (err) {
        if (!mountedRef.current) return undefined;

        const error = err instanceof Error ? err : new Error('An unexpected error occurred');
        setError(error);
        setIsLoading(false);

        if (showErrorToast) {
          toast({
            variant: 'destructive',
            title: 'Error',
            description: error.message || 'Something went wrong. Please try again.',
          });
        }

        onError?.(error);
        return undefined;
      }
    },
    [asyncFunction, onSuccess, onError, showErrorToast, showSuccessToast, successMessage]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  return { execute, data, error, isLoading, reset };
}
