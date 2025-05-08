import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_WORKS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import Link from "next/link";

export const generateMetadata = async () => generatePagesMetadata(URL_WORKS);

export default async function Page() {
  const data = await getFetchData(URL_WORKS);

  return data && (
    <DataProvider data={data}>
      <h1 style={{ margin: "2vw" }}>WORKSSSS</h1>
      {data?.works.list.map((work) => (
        <Link style={{ marginLeft: "2vw" }} key={work.link} href={`/works/${work.link.split("https://twid.marketing/works/")[1]}`}>
          <h2>{work.title}</h2>
        </Link>
      ))}
    </DataProvider>
  );
}
