"use client";
import React, { use, useContext, useRef, useState } from "react";
import { DataContext } from "@/lib/providers/DataProvider/context";
import "./WorksHero.scss";
import { Content } from "@/utils/Content/Content";
import Image from "next/image";
import Link from "next/link";
import { useMotionValueEvent, useScroll } from "framer-motion";
import classNames from "classnames";

export default function WorksHero() {
  const { data } = useContext(DataContext);
  const { website } = data;
  const sectionRef = useRef(null);
  const [isWebLinkFixed, setIsWebLinkFixed] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["0% 0%", "100% 0%"],
  });

  useMotionValueEvent(scrollYProgress, "change", (latest) => {
    setIsWebLinkFixed(latest === 1);
  });

  return (
    <>
      {website.active && (website.url_button_fixed_desktop || website.url_button_fixed_mobile) && (
        <Link
          href={website.link}
          className={classNames("hero__link hero__link--fixed", {
            "hero__link--fixed--active": isWebLinkFixed,
            "hero__link--fixed--not-desktop": !website.url_button_fixed_desktop,
            "hero__link--fixed--not-mobile": !website.url_button_fixed_mobile,
          })}
          target="_blank"
        >
          <p>{website.text}</p>
        </Link>
      )}
      <section className="hero" ref={sectionRef} style={{ "--color": data?.text_color }}>
        <Content
          className="hero__content"
          url={data.media.url}
          urlMobile={data.media.url_mobile}
          lazy={false}
        />
        <div className="hero__container work-container container">
          <div className="hero__text" style={{ color: data?.text_color }}>
            <p className="hero__description">{data?.company}</p>
            <h1 className="hero__title">{data?.title}</h1>
          </div>
          {data?.website.active && (
            <Link href={website.link} className="hero__link" target="_blank" data-hide-for-mobile--flex>
              <p>{website.text}</p>
              <Image
                src={website.img}
                alt={`${data?.company} website`}
                width={222}
                height={130}
                className="hero__link-image"
              />
            </Link>
          )}
        </div>
      </section>
    </>
  );
}
