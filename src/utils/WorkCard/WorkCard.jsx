"use client";
import React from "react";
import { Content } from "../Content/Content";

import "./WorkCard.scss";
import Link from "next/link";
import Image from "next/image";
import LazyLoad from "../Content/LazyLoad";

export const WorkCard = ({ data, ...rest }) => {
  const preparedLink = `/${data?.link.split("https://twid.marketing/")[1]}`
  return (
    <Link href={preparedLink} className="work-card" {...rest}>
      <Content
        url={data?.media.url}
        urlMobile={data?.media.url_mobile}
        alt={`${data.title} - ${data.company}`}
        className="work-card__image"
      />
      <div className="content">
        <div className="work-card__categories">
          {data.categories.map((category, index) => (
            <span key={index} className="work-category">{category.title}</span>
          ))}
        </div>
        <div className="bottom" style={{ color: data?.text_color }}>
          <div className="text">
            <span>{data?.company}</span>
            <h1>{data?.title}</h1>
          </div>
          {data?.website.active && (
            <div className="website-link" target="_blank">
            <p>{data?.website.text}</p>
            <Image
              src={data?.website.img}
              alt={`${data?.company} website`}
              width={100}
              height={58}
              className="website-link__image"
              loading="lazy"
            />
          </div>
          )}
        </div>
      </div>
    </Link>
  );
};
