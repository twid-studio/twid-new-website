import { getFetchData } from "@/lib/helpers/DataFetch";
import { EN_URL_OPTIONS, URL_OPTIONS } from "@/lib/helpers/DataUrls";
import { LocaleProvider } from "@/lib/providers/LocaleContext/LocaleContext";
import Contacts from "@/utils/Contacts/Contacts";
import Footer from "@/utils/Footer/Footer";
import Header from "@/utils/Header/Header";
import React from "react";

export default async function template({ children }) {
  const [uaData, enData] = await Promise.all([
    getFetchData(URL_OPTIONS),
    getFetchData(EN_URL_OPTIONS)
  ]);

  // Combine data into a single object with language keys
  const multilingualData = {
    ua: uaData,
    en: enData,
    ...uaData
  };

  return multilingualData && (
    <LocaleProvider>
      <Header allData={multilingualData} />
      {children}
      <Contacts allData={multilingualData} /> 
      <Footer allData={multilingualData} />
    </LocaleProvider>
  );
}

