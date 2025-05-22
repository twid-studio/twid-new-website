"use client";
import { DataContext } from "@/lib/providers/DataProvider/context";
import React, { useContext } from "react";
import {
  MediaSection,
  TextFullMediaSection,
  TextHalfMediaSection,
  TextQuoteHalfMediaSection,
  TextSection,
  TitleTextFullMediaSection,
} from "./TextSections/TextSections";
import { ReviewsSection } from "./Reviews/Reviews";
import "./Sections.scss";

export default function Sections() {
  const { data } = useContext(DataContext);

  const renderComponent = (section, index) => {
    switch (section.type) {
      case "text_text_media":
        return <TextFullMediaSection key={index} data={section} />;
      case "title_text_media":
        return <TitleTextFullMediaSection key={index} data={section} />;
      case "text_media":
        return <TextHalfMediaSection key={index} data={section} />;
      case "media_text_quote":
        return <TextQuoteHalfMediaSection key={index} data={section} />;
      case "media":
        return <MediaSection key={index} data={section} />;
      case "title_text":
        return <TextSection key={index} data={section} />;
      case "reviews":
        return <ReviewsSection key={index} data={section} />;
      default:
        return null;
    }
  };

  return (
    data.content && (
      <section className="sections__wrapper">
        {data.content.map((section, index) => renderComponent(section, index))}
      </section>
    )
  );
}
