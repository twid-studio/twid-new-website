import React, { useEffect, useRef } from "react";
import "./WorksFilter.scss";
import classNames from "classnames";

export default function WorksFilter({ filters, setFilters, setCases, data }) {
  const worksListRef = useRef(null);

  // Find the works list element on mount
  useEffect(() => {
    worksListRef.current = document.getElementById('works-list');
  }, []);

  const handleFilterChange = (filter) => {
    setFilters(filter.id);

    // If empty ID (All Projects filter)
    if (filter.id === "") {
      setCases(data.works.list); // Show all works
    } else {
      // Otherwise, filter by category
      setCases(
        data.works.list.filter(
          (item) =>
            Array.isArray(item.categories) &&
            item.categories.some(
              (category) => category.id === filter.id || category === filter.id
            )
        )
      );
    }

    // Scroll to the top of the works list after filter is applied
    setTimeout(() => {
      if (worksListRef.current) {
        worksListRef.current.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 100); // Small timeout to ensure DOM updates complete
  };
  return (
    <div className="filters-container container">
      <div className="filters">
        {data.categories.map((filter, index) => (
          <button
            key={`filter-button__${index}`}
            className={classNames("filter-button category", {
              "filter-button--active": filters === filter.id
            }
            )}
            onClick={() => handleFilterChange(filter)}
          >
            {filter.title}
          </button>
        ))}
      </div>
    </div>
  );
}
