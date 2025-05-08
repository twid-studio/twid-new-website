"use client";
import React, { useContext, useEffect, useRef } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";
import "./Brands.scss";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import classNames from "classnames";

export default function Brands() {
  const { data: allData } = useContext(DataContext);
  const { brands: data } = allData;
  const progressBarRef = useRef(null);
  const splideRef = useRef(null);

  const swiperOptions = {
    arrows: false,
    pagination: false,
    centered: true,
    perPage: 3,
    gap: "5.2vw",
    padding: "2vw",
    destroy: data?.list.length <= 3,
    breakpoints: {
      900: {
        gap: "5vw",
        padding: "4vw",
      },
      600: {
        gap: "5vw",
        padding: "5vw",
        centered: false,
      },
    },
  };

  useEffect(() => {
    if (!splideRef.current || !progressBarRef.current) return;

    const splideInstance = splideRef.current.splide;
    const bar = progressBarRef.current;

    const updateProgressBar = () => {
      if (!splideInstance || !bar) return;
      const end = splideInstance.Components.Controller.getEnd() + 1;
      const rate = Math.min((splideInstance.index + 1) / end, 1);
      bar.style.width = String(100 * rate) + '%';
    };

    // Update on mount and move events
    splideInstance.on('mounted move', updateProgressBar);
    updateProgressBar()
    // Cleanup event listeners
    return () => {
      splideInstance?.off('mounted move', updateProgressBar);
    };
  }, [splideRef.current, progressBarRef.current]);

  return (
    data?.active && (
      <section className="brands">
        <h1
          className="brands__title"
          dangerouslySetInnerHTML={{ __html: data.title }}
        />

        <Splide
          ref={splideRef}
          options={swiperOptions}
          className={classNames("brands__list", {
            "brands__list--destroy": data?.list.length <= 3,
          })}
        >
          {data?.list.map((item, index) => (
            <SplideSlide className="brands__item" key={index}>
              <img src={item?.logo} alt="" className="brands__image" />
            </SplideSlide>
          ))}
        </Splide>

        {!(data?.list.length <= 3) && (
          <div className="slider-progress">
            <div ref={progressBarRef} className="slider-progress__bar"></div>
          </div>
        )}
      </section>
    )
  );
}
