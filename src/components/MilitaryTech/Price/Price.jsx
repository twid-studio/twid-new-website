"use client"

import { DataContext } from '@/lib/providers/DataProvider/context';
import React, { useContext } from 'react'

import "./Price.scss";
import Image from 'next/image';

export default function Price() {
  const { data: allData } = useContext(DataContext);
  const { price: data } = allData;

  return data?.active && (
    <div className="price-wrapper">
      <section className="price">
        <Image
          src="/images/military/military-price-icon.svg"
          width={40}
          height={40}
          alt=""
          className="price__icon"
        />
        <h2>{data?.text}</h2>
      </section>
    </div>
  )
}
