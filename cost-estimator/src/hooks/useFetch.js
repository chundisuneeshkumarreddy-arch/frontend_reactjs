import { useCallback, useEffect, useRef, useState } from 'react';
const MIN_LOADING_MS = 1000;
const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
;


export function useFetch(fetcher) {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetcherRef = useRef(fetcher);
  const controllerRef = useRef(null);

  useEffect(() => {
    fetcherRef.current = fetcher;
  });

  const run = useCallback(async () => {
    controllerRef.current?.abort();

    const controller = new AbortController();
    controllerRef.current = controller;

    try {
    //   const result = await fetcherRef.current({ signal: controller.signal });
    
    const [result] = await Promise.all([
      fetcherRef.current({ signal: controller.signal }),
      delay(MIN_LOADING_MS)
    ])
   

      if (controller.signal.aborted) return;

      setData(result);
    } catch (err) {
      if (controller.signal.aborted) return;

      setError(err);
    } finally {
      if (!controller.signal.aborted) {
        setLoading(false);
      }
    }
  }, []);

  const refetch = useCallback(() => {
    setError(null);
    setLoading(true);

    return run();
  }, [run]);

  useEffect(() => {
    run();

    return () => {
      controllerRef.current?.abort();
    };
  }, [run]);

  return {
    data,
    isLoading,
    error,
    refetch
  };
}