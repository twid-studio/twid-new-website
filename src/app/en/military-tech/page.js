import MilitaryTech from "@/components/MilitaryTech/MilitaryTech";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { EN_URL_MILITARY_TECH } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export const generateMetadata = async () => generatePagesMetadata(EN_URL_MILITARY_TECH);

export default async function Page() {
  const data = await getFetchData(EN_URL_MILITARY_TECH);

  return data && (
    <DataProvider data={data}>
      <MilitaryTech />
    </DataProvider>
  );
}
