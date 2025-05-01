"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext, useRef } from "react";

import "./MilitaryHero.scss";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";

export default function MilitaryHero() {
  const { data: allData } = useContext(DataContext);
  const { preview: data } = allData;
  const { slogan } = allData;

  const sectionRef = useRef();

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "80%"]);

  return (
    <section className="hero" ref={sectionRef}>
      <motion.div style={{ y }} className="hero-top">
        <Image
          className="hero__lines hero__lines--top"
          src="/images/military/lines.svg"
          alt="lines"
          width={0}
          height={0}
          sizes="100vw"
        />
        <div className="text">
          <p className="super-text">{data.title}</p>
          <h2 className="hero__subtitle">{data?.text}</h2>
        </div>
        <Image
          className="hero__lines hero__lines--bottom"
          src="/images/military/lines.svg"
          alt="lines"
          width={0}
          height={0}
          sizes="100vw"
        />
      </motion.div>
      <div className="slogan">
        <div className="slogan-content">
          <p
            className="slogan-text"
            dangerouslySetInnerHTML={{ __html: slogan?.text }}
          />
          <Image 
            width={73}
            height={73}
            className="slogan__logo"
            src="/images/military/slogan.jpg"
            alt="slogan"
          />
        </div>
      </div>
    </section>
  );
}
