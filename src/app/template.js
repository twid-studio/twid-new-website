import { getFetchData } from "@/lib/helpers/DataFetch";
import { EN_URL_OPTIONS, URL_OPTIONS } from "@/lib/helpers/DataUrls";
import { LocaleProvider } from "@/lib/providers/LocaleContext/LocaleContext";
import Contacts from "@/utils/Contacts/Contacts";
import Footer from "@/utils/Footer/Footer";
import Header from "@/utils/Header/Header";
import React from "react";

export default async function template({ children }) {
  // Add cache options to allow static rendering
  const fetchOptions = { 
    next: { revalidate: 3600 } // Cache data for 1 hour
  };

  // Fetch both language versions in parallel with caching
  const [uaData, enData] = await Promise.all([
    getFetchData(URL_OPTIONS, fetchOptions),
    getFetchData(EN_URL_OPTIONS, fetchOptions)
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

