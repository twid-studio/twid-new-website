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
  ...rest
}) => {
  const isVideo = url.match(/\.(mp4|webm)$/) != null;
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    setOffset(window.innerHeight * offestIndex);
  }, []);

  // For videos, use media attribute with aspect ratio
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

  // For images, use picture element with aspect ratio media query
  const ImageContent = (props) =>
    urlMobile ? (
      <motion.picture {...props}>
        <source srcSet={urlMobile} media="(max-aspect-ratio: 2/3)" />
        <img src={url} width="100%" height="100%" />
      </motion.picture>
    ) : (
      <motion.img src={url} width="100%" height="100%" {...props} />
    );

  // Choose the appropriate content based on media type
  const ContentComp = isVideo ? (
    <VideoContent loading="lazy" />
  ) : (
    <ImageContent loading="lazy" />
  );

  if (!url) {
    return;
  }

  return lazy ? (
    <LazyLoad offset={offset} {...rest}>
      {ContentComp}
    </LazyLoad>
  ) : isVideo ? (
    <VideoContent {...rest} />
  ) : (
    <ImageContent {...rest} />
  );
};
