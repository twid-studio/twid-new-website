"use client";
import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import LazyLoad from "./LazyLoad";
import { anim, fadeIn } from "@/lib/helpers/anim";

export const Content = ({
  url,
  urlMobile = false,
  lazy = true,
  offestIndex = 1,
  sizes = false,
  ...rest
}) => {
  const isVideo = url.match(/\.(mp4|webm)$/) != null;
  const [offset, setOffset] = useState(0);

  // Calculate aspect ratio if sizes is provided
  const aspectRatio = sizes && sizes.width && sizes.height 
    ? `${sizes.width} / ${sizes.height}`
    : null;

  // Create style object with aspect ratio if available
  const aspectRatioStyle = aspectRatio 
    ? { style: { aspectRatio }  }
    : {};

  useEffect(() => {
    setOffset(window.innerHeight * offestIndex);
  }, [offestIndex]); // Always include this dependency

  const VideoContent = (props) => (
    <motion.video
      loop
      muted
      autoPlay
      playsInline
      width="100%"
      height="100%"
      {...props}
    >
      {urlMobile && <source src={urlMobile} media="(max-aspect-ratio: 2/3)" />}
      <source src={url} />
    </motion.video>
  );

  const ImageContent = (props) =>
    urlMobile ? (
      <motion.picture {...props}>
        <source srcSet={urlMobile} media="(max-aspect-ratio: 2/3)" />
        <img src={url} width="100%" height="100%" />
      </motion.picture>
    ) : (
      <motion.img src={url} width="100%" height="100%" {...props} />
    );

  const ContentComp = isVideo ? (
    <VideoContent loading="lazy" />
  ) : (
    <ImageContent loading="lazy" />
  );

  if (!url) {
    return null;
  }

  return lazy ? (
    <LazyLoad offset={offset} {...aspectRatioStyle} {...rest}>
      {ContentComp}
      <div className="lazyload-placeholder"></div>
    </LazyLoad>
  ) : isVideo ? (
    <VideoContent {...rest} />
  ) : (
    <ImageContent {...rest} />
  );
};
