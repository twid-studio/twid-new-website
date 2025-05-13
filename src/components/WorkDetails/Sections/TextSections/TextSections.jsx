import React from "react";
import "./TextSections.scss";
import { Content } from "@/utils/Content/Content";
import classNames from "classnames";

export const TextFullMediaSection = ({ data }) => {
  return (
    <section className="text-fullmedia-section container">
      {(data?.text_1 || data?.text_2) && (
        <div className="text-wrapper work-container">
          {data?.text_1 && (
            <div
              className="text"
              dangerouslySetInnerHTML={{ __html: data?.text_1 }}
            />
          )}
          {data?.text_2 && (
            <div
              className="text text--second"
              dangerouslySetInnerHTML={{ __html: data?.text_2 }}
            />
          )}
        </div>
      )}
      {data?.media?.url && (
        <Content
          className="text-fullmedia-section__content"
          url={data?.media?.url}
          urlMobile={data?.media?.url_mobile}
          sizes={data?.media.url_size}
        />
      )}
    </section>
  );
};

export const TitleTextFullMediaSection = ({ data }) => {
  return (
    <section className="title-text-fullmedia-section container">
      {(data?.text || data?.title) && (
        <div className="work-container">
          <div className="text-wrapper">
            {data?.title && (
              <h1
                dangerouslySetInnerHTML={{ __html: data?.title }}
              />
            )}
            {data?.text && (
              <div
                className="text"
                dangerouslySetInnerHTML={{ __html: data?.text }}
              />
            )}
          </div>
        </div>
      )}
      {data?.media?.url && (
        <Content
          className="title-text-fullmedia-section__content"
          url={data?.media?.url}
          urlMobile={data?.media?.url_mobile}
          sizes={data?.media.url_size}
        />
      )}
    </section>
  );
};

export const TextHalfMediaSection = ({ data }) => {
  return (
    <section
      className={classNames("text-halfmedia-section work-container container", {
        "text-halfmedia-section--right": data?.media_align === "right",
      })}
    >
      <div className="medias">
        {data?.media_list.map(
          (media, index) =>
            media?.url && (
              <Content
                key={index}
                className="text-halfmedia-section__content"
                url={media?.url}
                urlMobile={media?.url_mobile}
                sizes={media?.url_size}
              />
            )
        )}
      </div>

      <div className="text-wrapper">
        {data?.title && <h1>{data?.title}</h1>}
        {data?.text && (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: data?.text }}
          />
        )}
      </div>
    </section>
  );
};

export const TextQuoteHalfMediaSection = ({ data }) => {
  return (
    <section
      className={classNames("text-halfmedia-section work-container container", {
        "text-halfmedia-section--right": data?.media_align === "right",
      })}
    >
      <div className="medias">
        {data.media?.url && (
          <Content
            className="text-halfmedia-section__content"
            url={data.media?.url}
            urlMobile={data.media?.url_mobile}
            sizes={data?.media.url_size}
          />
        )}
      </div>

      <div className="text-wrapper">
        {data?.title && <h1>{data?.title}</h1>}
        {data?.text && (
          <div
            className="text"
            dangerouslySetInnerHTML={{ __html: data?.text }}
          />
        )}
      </div>
    </section>
  );
};

export const MediaSection = ({ data }) => {
  return (
    <section className="media-section container">
      {data?.media.type !== "youtube" ? (
        <Content
          className="media-section__content"
          url={data.media?.url}
          urlMobile={data.media?.url_mobile}
          sizes={data?.media.url_size}
        />
      ) : (
        <div
          className="media-section__content"
          dangerouslySetInnerHTML={{ __html: data.media?.iframe }}
        />
      )}
    </section>
  );
};

export const TextSection = ({ data }) => {
  return (
    <section className="text-section work-container container">
      {data?.title && <h1>{data?.title}</h1>}
      {data?.text && <div dangerouslySetInnerHTML={{ __html: data?.text }} />}
    </section>
  );
};
