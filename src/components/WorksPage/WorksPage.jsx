"use client";
import React, { useContext, useState } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";
import WorksList from "./WorksList/WorksList";

import "./WorksPage.scss";
import WorksFilter from "./WorksFilter/WorksFilter";
import { AnimatePresence } from "framer-motion";

export default function WorksPage() {
  const { data } = useContext(DataContext);
  const [cases, setCases] = useState(data?.works.list || []);
  const [filters, setFilters] = useState("all");

  return (
    <main className="works-page">
      <div className="title">
        <p className="super-text">{data?.title}</p>
        <h2
          className="title-text"
          dangerouslySetInnerHTML={{ __html: data?.text }}
        />
      </div>

    <div id="works-list">
      <WorksFilter
        filters={filters}
        setFilters={setFilters}
        setCases={setCases}
        data={data}
      />
        <WorksList data={cases} filter={filters} />
    </div>
    </main>
  );
}
