import HomePage from "@/components/HomePage/HomePage";
import WorksPage from "@/components/WorksPage/WorksPage";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { EN_URL_WORKS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { WorkCard } from "@/utils/WorkCard/WorkCard";

export const generateMetadata = async () => generatePagesMetadata(EN_URL_WORKS);

export default async function Page() {
  const data = await getFetchData(EN_URL_WORKS);

  return data && (
    <DataProvider data={data}>
      <WorksPage />
    </DataProvider>
  );
}