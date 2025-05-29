import axios from 'axios';
import useSWR from 'swr';
import React from 'react';

// Keep the base function for non-React contexts
export async function getFetchData(apiUrl, options = {}) {
  const { timeout = 30000 } = options;
  
  // Create a cancel token for this request
  const source = axios.CancelToken.source();
  
  try {
    const response = await axios.get(apiUrl, {
      timeout: timeout,
      cancelToken: source.token,
      ...options
    });
    
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(`Request to ${apiUrl} was cancelled`);
    } else if (error.code === 'ECONNABORTED') {
      console.error(`Request to ${apiUrl} timed out after ${timeout}ms`);
    } else {
      console.error("Error fetching data:", 
        error.response ? `${error.response.status} ${error.response.statusText}` : error.message,
        `\n ${apiUrl}`);
    }
    return {};
  }
}

// SWR fetcher function
const fetcher = async (url, options = {}) => {
  const source = axios.CancelToken.source();
  const { timeout = 30000, ...restOptions } = options;
  
  try {
    const response = await axios.get(url, {
      timeout,
      cancelToken: source.token,
      ...restOptions
    });
    return response.data;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log(`Request to ${url} was cancelled`);
      return null;
    }
    throw error;
  }
};

// React hook using SWR for data fetching
export function useData(url, options = {}) {
  const { 
    swrOptions = {}, 
    axiosOptions = {},
    dedupingInterval = 60000, // Default cache time (1 minute)
    revalidateOnFocus = false,
    revalidateOnReconnect = true
  } = options;
  
  const { data, error, isLoading, isValidating, mutate } = useSWR(
    url ? url : null, 
    url => fetcher(url, axiosOptions),
    { 
      dedupingInterval,
      revalidateOnFocus,
      revalidateOnReconnect,
      ...swrOptions 
    }
  );

  return {
    data,
    isLoading,
    isValidating, 
    error,
    mutate,
    isError: !!error
  };
}

// For manual data fetching with cleanup
export function useManualFetch() {
  const sourceRef = React.useRef(null);
  
  React.useEffect(() => {
    return () => {
      // Cancel pending requests when component unmounts
      if (sourceRef.current) {
        sourceRef.current.cancel('Component unmounted');
      }
    };
  }, []);
  
  const fetchData = React.useCallback(async (url, options = {}) => {
    if (sourceRef.current) {
      sourceRef.current.cancel('New request initiated');
    }
    
    sourceRef.current = axios.CancelToken.source();
    
    return getFetchData(url, {
      ...options,
      cancelToken: sourceRef.current.token
    });
  }, []);
  
  return fetchData;
}
