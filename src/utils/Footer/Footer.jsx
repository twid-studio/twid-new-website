"use client";
import React, { useContext } from "react";

import "./Footer.scss";
import Link from "next/link";
import Image from "next/image";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

export default function Footer({ allData }) {
  const { lang } = useContext(LocaleContext);
  const preparedData = useLanguageContent(allData, lang);
  const { footer: data } = preparedData;
  const { contacts } = preparedData;

  return (
    <footer className="footer">
      {data.menu_1.length !== 0 && (
        <div className="footer__nav">
          {data.menu_1.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="footer__nav__item"
              target={item.link.startsWith("https") ? "_blank" : "_self"}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}
      {data.menu_2.length !== 0 && (
        <div className="footer__nav">
          {data.menu_2.map((item, index) => (
            <Link
              key={index}
              href={item.link}
              className="footer__nav__item"
              target={item.link.startsWith("https") ? "_blank" : "_self"}
              style={{ "--color": item.color }}
            >
              {item.text}
            </Link>
          ))}
        </div>
      )}

      <div className="footer-contacts">
        <p dangerouslySetInnerHTML={{ __html: contacts?.address || "" }} />
        <div className="socials">
          {contacts?.social &&
            contacts?.social.map((item, index) => (
              <Link
                key={index}
                href={item.link}
                className="socials__item"
                target="_blank"
              >
                <Image src={item.icon} width={40} height={40} alt="" />
              </Link>
            ))}
        </div>
      </div>
      <div className="footer__copyright shadow">
        <p>{data?.copy}</p>
      </div>
      <Link
        href={data?.link_1.link || ""}
        className="footer__copyright-link shadow"
        data-only-desktop
      >
        <p>{data?.link_1.text}</p>
      </Link>
      <Link
        href={data?.link_2.link || ""}
        className="footer__copyright-link shadow"
        data-only-desktop
      >
        <p>{data?.link_2.text}</p>
      </Link>

      <div data-not-desktop--flex className="footer__copyright-wrapper">
        <Link
          href={data?.link_1.link || ""}
          className="footer__copyright-link shadow"
        >
          <p>{data?.link_1.text}</p>
        </Link>
        <Link
          href={data?.link_2.link || ""}
          className="footer__copyright-link shadow"
        >
          <p>{data?.link_2.text}</p>
        </Link>
      </div>
    </footer>
  );
}
