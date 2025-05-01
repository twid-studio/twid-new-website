"use client";
import { DataContext } from '@/lib/providers/DataProvider/context';
import React, { useContext } from 'react'

import "./MilitaryServices.scss";

export default function MilitaryServices() {
  const { data: allData } = useContext(DataContext);
  const { services: data } = allData;

  return data.active && (
    <section className="military-services">
      <h1 className="military-services__title" dangerouslySetInnerHTML={{ __html: data?.title }} />
      <div className="military-services__list">
        {data?.list.map((item, index) => (
          <div className="military-services__item" key={index} style={{ backgroundColor: item?.color }}>
            <p className="super-text military-services__item-title" dangerouslySetInnerHTML={{ __html: item?.title }}/>
            <p className="military-services__item-text" 
            dangerouslySetInnerHTML={{ __html: item?.text }}
            />
          </div>
        ))}
      </div>
    </section>
  )
}
