import { Splide, SplideSlide } from "@splidejs/react-splide";
import classNames from "classnames";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";

import "./Reviews.scss";
import "@splidejs/react-splide/css";
import useIsDesktop from "@/lib/helpers/useIsDesktop";
import useIsMobile from "@/lib/helpers/useIsMobile";

export const ReviewsSection = ({ data }) => {
  const isDesktop = useIsDesktop();
  const isMobile = useIsMobile();
  const progressBarRef = useRef(null);
  const splideRef = useRef(null);
  const [shouldDestroy, setShouldDestroy] = useState(false);

  useEffect(() => {
    const reviewCount = data.reviews?.length || 0;

    // Fixed logic for when to destroy the slider
    if (isMobile && reviewCount <= 1) {
      // For mobile: destroy if 1 or fewer reviews
      setShouldDestroy(true);
    } else if (!isDesktop && !isMobile && reviewCount <= 2) {
      // For tablets: destroy if 2 or fewer reviews
      setShouldDestroy(true);
    } else if (isDesktop && reviewCount <= 3) {
      // For desktop: destroy if 3 or fewer reviews
      setShouldDestroy(true);
    } else {
      // Otherwise keep the slider
      setShouldDestroy(false);
    }
  }, [data.reviews, isDesktop, isMobile]);

  const swiperOptions = {
    arrows: false,
    pagination: false,
    centered: true,
    perPage: 3,
    gap: "1.5625vw",
    padding: "2vw",
    width: "100%",
    breakpoints: {
      900: {
        perPage: 2,
        gap: "5vw",
        padding: "2.3980815348vw",
      },
      600: {
        perPage: 1,
        gap: "5vw",
        padding: "4vw",
      },
    },
  };

  useEffect(() => {
    if (!splideRef.current || !progressBarRef.current || shouldDestroy) return;

    const splideInstance = splideRef.current.splide;
    const bar = progressBarRef.current;

    const updateProgressBar = () => {
      if (!splideInstance || !bar) return;
      const end = splideInstance.Components.Controller.getEnd() + 1;
      const rate = Math.min((splideInstance.index + 1) / end, 1);
      bar.style.width = String(100 * rate) + "%";
    };

    // Update on mount and move events
    splideInstance.on("mounted move", updateProgressBar);
    updateProgressBar();

    // Cleanup event listeners
    return () => {
      splideInstance?.off("mounted move", updateProgressBar);
    };
  }, [shouldDestroy]);

  // If should destroy, render static content instead
  if (shouldDestroy) {
    return (
      <section className="reviews-section container reviews-section--static">
        <div className="reviews-section__list--static">
          {data.reviews.map((review, index) => (
            <ReviewCard key={index} review={review} />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="reviews-section">
      <Splide
        ref={splideRef}
        options={swiperOptions}
        className="reviews-section__list"
      >
        {data.reviews.map((review, index) => (
          <SplideSlide key={index} className="review">
            <div className="person">
              {review?.photo && (
                <Image
                  className="person__image"
                  src={review?.photo}
                  alt={`${review?.name} photo`}
                  width={100}
                  height={100}
                />
              )}
              <div className="person__info">
                {review?.name && <p>{review?.name}</p>}
                {review?.position && <p>{review?.position}</p>}
              </div>
            </div>

            <div
              className="review__text text"
              dangerouslySetInnerHTML={{ __html: `"${review?.text}"` }}
            />
          </SplideSlide>
        ))}
      </Splide>

      <div className="slider-progress">
        <div ref={progressBarRef} className="slider-progress__bar"></div>
      </div>
    </section>
  );
};

const ReviewCard = ({ review }) => (
  <div className="review">
    <div className="person">
      {review?.photo && (
        <Image
          className="person__image"
          src={review?.photo}
          alt={`${review?.name} photo`}
          width={100}
          height={100}
        />
      )}
      <div className="person__info">
        {review?.name && <p>{review?.name}</p>}
        {review?.position && <p>{review?.position}</p>}
      </div>
    </div>

    <div
      className="review__text text"
      dangerouslySetInnerHTML={{ __html: `"${review?.text}"` }}
    />
  </div>
);