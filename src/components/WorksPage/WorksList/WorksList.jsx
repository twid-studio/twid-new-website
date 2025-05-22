import useIsMobile from "@/lib/helpers/useIsMobile";
import { WorkCard } from "@/utils/WorkCard/WorkCard";
import React, { useMemo, useCallback } from "react";

import "./WorksList.scss";
import { AnimatePresence, motion } from "framer-motion";
import { anim, fadeIn } from "@/lib/helpers/anim";

// Cache for work data
const workCache = new Map();

export default function WorksList({ data, filter }) {
  const isMobile = useIsMobile();
  
  // Create a cache key based on the data
  const cacheKey = useMemo(() => {
    return `${filter}-${data?.length}-${data?.[0]?.id || ""}`;
  }, [filter, data]);
  
  // Memoize the split work arrays
  const { evenWorks, oddWorks } = useMemo(() => {
    // Check if we have this data in cache
    if (workCache.has(cacheKey)) {
      return workCache.get(cacheKey);
    }
    
    const even = [];
    const odd = [];
    
    // Split the works into two arrays
    if (data?.length) {
      data.forEach((work, index) => {
        if (index % 2 === 0) {
          even.push(work);
        } else {
          odd.push(work);
        }
      });
    }
    
    // Store in cache
    const result = { evenWorks: even, oddWorks: odd };
    workCache.set(cacheKey, result);
    
    return result;
  }, [data, cacheKey]);
  
  // Memoize the work card renderer to prevent unnecessary re-creation of functions
  const renderWorkCard = useCallback((work, index, prefix = "") => {
    return <WorkCard data={work} key={`${prefix}-${index}`} />;
  }, []);

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        {...anim(fadeIn())}
        key={`${data?.length}-${filter}`}
        className="works-list"
      >
        {isMobile ? (
          <div className="works-list__wrapper">
            {data?.map((work, index) => renderWorkCard(work, index))}
          </div>
        ) : (
          <>
            <div className="works-list__wrapper">
              {evenWorks.map((work, index) => renderWorkCard(work, index, "even"))}
            </div>
            <div className="works-list__wrapper">
              {oddWorks.map((work, index) => renderWorkCard(work, index, "odd"))}
            </div>
          </>
        )}
      </motion.div>
    </AnimatePresence>
  );
}

// For parent component that fetches the data, implement this hook:
export function useWorksData(url) {
  const [works, setWorks] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const cacheKey = `works-${url}`;
  
  React.useEffect(() => {
    // Check localStorage first
    const cachedData = localStorage.getItem(cacheKey);
    if (cachedData) {
      try {
        const parsed = JSON.parse(cachedData);
        setWorks(parsed);
        setLoading(false);
      } catch (e) {
        // Invalid cache, continue with fetch
      }
    }
    
    // Fetch fresh data
    const controller = new AbortController();
    
    async function fetchData() {
      try {
        setLoading(true);
        const response = await fetch(url, { signal: controller.signal });
        if (response.ok) {
          const data = await response.json();
          setWorks(data);
          // Cache in localStorage
          localStorage.setItem(cacheKey, JSON.stringify(data));
        }
      } catch (error) {
        if (error.name !== 'AbortError') {
          console.error('Error fetching works:', error);
        }
      } finally {
        setLoading(false);
      }
    }
    
    fetchData();
    
    return () => {
      controller.abort();
    };
  }, [url, cacheKey]);
  
  return { works, loading };
}