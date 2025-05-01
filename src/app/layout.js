import localFont from "next/font/local";
import "@/styles/reset.scss";
import { ScrollProvider } from "@/lib/providers/ScrollProvider/ScrollProvider";
import Header from "@/utils/Header/Header";
import Footer from "@/utils/Footer/Footer";
import { LocaleProvider } from "@/lib/providers/LocaleContext/LocaleContext";

const twidGrotesk = localFont({
  src: [
    {
      path: "./fonts/TwidGrotesk-Regular.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-twid-grotesk",
});

const arialMT = localFont({
  src: [
    {
      path: "./fonts/ArialMT.woff2",
      weight: "400",
      style: "normal",
    },
  ],
  variable: "--font-arial-mt",
});

export const metadata = {
  title: "RTRTS TMPLATE",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className="html">
      <body className={`${twidGrotesk.variable} ${arialMT.variable} body`}>
        {/* <ScrollProvider scrollBar></ScrollProvider> */}
        {children}
      </body>
    </html>
  );
}
