import HomePage from "@/components/HomePage/HomePage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_HOME } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export const generateMetadata = async () => generatePagesMetadata(URL_HOME);

export default async function Home() {
  const data = await getFetchData(URL_HOME);

  return (
    <DataProvider data={data}>
      <HomePage />
    </DataProvider>
  );
}
