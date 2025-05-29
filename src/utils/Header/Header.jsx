"use client";
import React, { useContext, useState } from "react";
import { Logo } from "../Logo/Logo";

import "./Header.scss";
import Link from "next/link";
import { Button } from "../Button/Button";
import { AnimatePresence, motion } from "framer-motion";
import { anim, MenuAnim } from "@/lib/helpers/anim";
import { LocaleContext } from "@/lib/providers/LocaleContext/context";
import { usePathname } from "next/navigation";
import Menu from "./Menu/Menu";
import { useLanguageContent } from "@/lib/helpers/useLanguageContent";

export default function Header({ allData }) {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const { lang } = useContext(LocaleContext);
  const preparedData = useLanguageContent(allData, lang);
  const { header: data } = preparedData;

  const path = usePathname();

  console.log("render header");
  

  const getLanguagePath = () => {
    // Determine target language (opposite of current)
    const targetLang = lang === "ua" ? "en" : "ua";

    // Handle root path special case
    if (path === "/" || path === "/en") {
      return targetLang === "ua" ? "/" : `/${targetLang}`;
    }

    // Handle regular paths
    const pathWithoutLang = path.replace(/^\/(en)\//, "/");

    if (targetLang === "ua") {
      return pathWithoutLang; // Remove language prefix for Ukrainian
    } else {
      return `/${targetLang}${pathWithoutLang === "/" ? "" : pathWithoutLang}`;
    }
  };

  return (
    <>
      <header className="header">
        <Link href={lang ==="ua" ? "/" : "/en"} className="header__logo-link">
          <Logo className="header__logo" />
        </Link>

        <div className="header__middle">
          <div
            className="button button--white menu-button"
            onClick={() => setIsMenuActive(!isMenuActive)}
          >
            <div className="button__icon">
              <AnimatePresence initial={false} mode="popLayout">
                {isMenuActive ? (
                  <motion.img
                    src="/images/icons/cross-black.svg"
                    alt="icon"
                    {...anim(MenuAnim.button)}
                    key={"cross" + isMenuActive}
                  />
                ) : (
                  <motion.span
                    key={"default" + isMenuActive}
                    {...anim(MenuAnim.button)}
                  >
                    М
                  </motion.span>
                )}
              </AnimatePresence>
            </div>
            <div className="button__text">{data?.menu?.title}</div>
          </div>
          <Button
            text={lang === "ua" ? "EN" : "UA"}
            href={getLanguagePath()}
            classes="lang-swith"
            iconShow={false}
          />
        </div>

        <p className="header__title" data-only-desktop>
          {data?.text}
        </p>
      </header>
      <p className="header-text" data-not-desktop>
        {data?.text}
      </p>
      <AnimatePresence initial={false} mode="wait">
        {isMenuActive && (
          <Menu
            isMenuActive={isMenuActive}
            setIsMenuActive={setIsMenuActive}
            data={data?.menu}
            socials={allData?.contacts.social}
          />
        )}
      </AnimatePresence>
    </>
  );
}
