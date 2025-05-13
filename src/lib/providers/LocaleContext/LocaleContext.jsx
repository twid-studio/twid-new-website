"use client"

import { useState, useEffect } from "react";
import { LocaleContext } from "./context";
import { usePathname } from "next/navigation";

export const LocaleProvider = ({ children }) => {
    const path = usePathname();
    const [lang, setLang] = useState("ua");

    useEffect(() => {
      const isEnPath = path.startsWith("/en");
      setLang((isEnPath && "en") || "ua");
    }, [path]);

    return (
      <LocaleContext.Provider value={{ lang }}>
        {children}
      </LocaleContext.Provider>
    );
}