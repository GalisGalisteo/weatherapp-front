import { useCallback, useEffect, useMemo, useState } from "react";

interface FetchDataParams<T, P> {
  apiCall: (param: P) => Promise<T>;
  params?: P | null;
}

/**
 * Custom hook to fetch data from an API.
 */

export default function useFetchData<T, P>({
  apiCall,
  params,
}: FetchDataParams<T, P>) {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const memoizedParams = useMemo(() => params, [params]);

  const fetchData = useCallback(async () => {
    if (!memoizedParams) return;
    setLoading(true);
    try {
      const data = await apiCall(memoizedParams as P);
      setData(data);
      setError(null);
    } catch (error) {
      console.error(`Error fetching data: ${(error as Error).message}`);
      setError("An error occurred. Please try again later.");
    } finally {
      setLoading(false);
    }
  }, [apiCall, memoizedParams]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const refetch = useCallback(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, refetch };
}
