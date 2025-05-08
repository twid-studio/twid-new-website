"use client";
import "./Categories.scss";
import { DataContext } from "@/lib/providers/DataProvider/context";
import Image from "next/image";
import React, { useContext } from "react";

export default function Categories() {
  const { data } = useContext(DataContext);
  const { categories } = data;
  const { awards } = data;

  return categories && (
    <section className="work-container categories__wrapper container">
      {categories.length > 0 && (
        <div className="categories">
          {categories.map((category, index) => (
            <p className="category" key={index}>
              {category.title}
            </p>
          ))}
        </div>
      )}
      {awards.length > 0 && (
        <div className="awards">
          <p className="awards__title shadow">Awards</p>
          <div className="awards__list">
            {awards.map((award, index) => (
              <Image
                key={index}
                src={award.logo}
                alt={`${data?.company} award`}
                width={100}
                height={100}
                className="award"
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
