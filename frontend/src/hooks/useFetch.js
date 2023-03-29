import { useState, useCallback } from 'react';

const useFetch = (url) => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);
  
  const executeFetch = useCallback( 
    async (options) => {
      try {
        setIsLoading(true);
        setError(null);
        const res = await fetch(url, { ...options });
        const json = await res.json();
        if (!res.ok) {
          setIsLoading(false);
          setError(json.error);
        } else {
          setData(json);
          setIsLoading(false);
        }
      } catch (err) {
        setIsLoading(false);
        setData(null);
        setError(err);
      }
    }, [url, setIsLoading, setError, setData]
  );
  return { data, isLoading, error, setError, executeFetch };
}

export default useFetch;
