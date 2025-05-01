"use client";
import { DataContext } from '@/lib/providers/DataProvider/context';
import React, { useContext } from 'react'

import "./MilitaryCategories.scss";

export default function MilitaryCategories() {
  const { data: allData } = useContext(DataContext);
  const { for: data } = allData;

  return data.active && (
    <section className="categories container">
      <h1 className="categories__title">{data?.title}</h1>
      <div className="categories__list">
        {data?.list.map((item, index) => (
          <h2 className="category" key={index}>{item?.text}</h2>
        ))}
      </div>
    </section>
  )
}
