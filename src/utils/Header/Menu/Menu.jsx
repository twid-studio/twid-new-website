import React, { useState, useEffect } from "react";

import "./Menu.scss";
import { motion } from "framer-motion";
import Link from "next/link";
import Image, { Image as Img } from "next/image";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import useIsDesktop from "@/lib/helpers/useIsDesktop";

export default function Menu({ isMenuActive, setIsMenuActive, data, socials }) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const isDesktop = useIsDesktop();

  return (
    <motion.div {...anim(MenuAnim.wrapper)} className="menu">
      <div className="menu-list">
        {data.list.map((item, index) => (
          <motion.div
            className="menu-list__item"
            key={index}
            style={{
              backgroundColor:
                hoveredIndex === index ? item.color : "transparent",
            }}
            {...anim(MenuAnim.links)}
            custom={index}
          >
            <Link
              href={item.link}
              className="menu-list__link"
              onMouseEnter={() => isDesktop && setHoveredIndex(index)}
              onMouseLeave={() => isDesktop && setHoveredIndex(null)}
              target={item.link.startsWith("https") ? "_blank" : "_self"}
              style={{
                color:
                  hoveredIndex !== null && hoveredIndex !== index
                    ? "#FFFFFF"
                    : "inherit",
              }}
            >
              <h1 onClick={() => setIsMenuActive(false)}>{item.text}</h1>
            </Link>
          </motion.div>
        ))}
      </div>

      <div className="menu-socials">
        {socials.map((item, index) => (
          <Link target="_black" key={index} href={item.link}>
            <div className="menu-socials__item">
              <Image
                src={item.icon}
                alt=""
                width={40}
                height={40}
                className="menu-socials__icon"
              />
            </div>
          </Link>
        ))}
      </div>

      <div className="menu__bg-container">
        {data?.list.map((item, index) => (
          <div
            key={index}
            className="menu__bg-wrapper"
            style={{
              opacity: hoveredIndex === index ? 1 : 0,
              filter:
                hoveredIndex === index ? "blur(0vw)" : "blur(0.3vw)",
            }}
          >
            <Image
              src={item.bg}
              fill
              alt={`Menu background ${index}`}
              className="menu__bg"
            />
          </div>
        ))}
      </div>
    </motion.div>
  );
}
