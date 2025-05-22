import axios from 'axios';

// Create a cache for responses
const responseCache = new Map();

export async function getFetchData(apiUrl, options = {}) {
  const { timeout = 30000, useCache = true, cacheTime = 60000 } = options;
  
  // Check cache first if enabled
  if (useCache && responseCache.has(apiUrl)) {
    const cachedData = responseCache.get(apiUrl);
    if (Date.now() - cachedData.timestamp < cacheTime) {
      return cachedData.data;
    }
    // Cache expired, remove it
    responseCache.delete(apiUrl);
  }

  // Create a cancel token for this request
  const source = axios.CancelToken.source();
  
  try {
    const response = await axios.get(apiUrl, {
      timeout: timeout,
      cancelToken: source.token,
      ...options
    });
    
    // Cache the successful response if caching is enabled
    if (useCache) {
      responseCache.set(apiUrl, {
        data: response.data,
        timestamp: Date.now()
      });
    }
    
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

// Helper hook for React components
export function useFetchWithCleanup(url, options = {}) {
  const sourceRef = React.useRef(null);
  
  React.useEffect(() => {
    sourceRef.current = axios.CancelToken.source();
    
    return () => {
      // Cancel pending requests when component unmounts
      if (sourceRef.current) {
        sourceRef.current.cancel('Component unmounted');
      }
    };
  }, []);
  
  const fetchData = React.useCallback(async () => {
    if (!sourceRef.current) {
      sourceRef.current = axios.CancelToken.source();
    }
    
    return getFetchData(url, {
      ...options,
      cancelToken: sourceRef.current.token
    });
  }, [url, options]);
  
  return fetchData;
}

// Clear the entire cache (useful for logout, etc.)
export function clearResponseCache() {
  responseCache.clear();
}
