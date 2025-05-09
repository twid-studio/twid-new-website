"use client";

import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";
import "./MoreWorks.scss";
import { WorkCard } from "@/utils/WorkCard/WorkCard";
import { Button } from "@/utils/Button/Button";

export default function MoreWorks() {
  const { data: allData } = useContext(DataContext);
  const { other_works: data } = allData;

  return (
    data &&
    data.active && (
      <section className="more-works">
        <h1
          className="more-works__title"
          dangerouslySetInnerHTML={{ __html: data?.title }}
        />
        <div className="more-works__content">
          {data?.list.map((work, index) => (
            <WorkCard data={work} key={index} />
          ))}
        </div>
        <Button
          // href={data?.button.link}
          href="/works"
          text={data?.button.text}
          classes="more-works__button"
        />
      </section>
    )
  );
}
