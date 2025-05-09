import WorkDetails from "@/components/WorkDetails/WorkDetails";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { EN_URL_FONT } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export async function generateMetadata() {
  return generatePagesMetadata(EN_URL_FONT);
}

export default async function WorkPage() {
  // Extract the id parameter from the URL
  
  const data = await getFetchData(EN_URL_FONT);

  return (
    <DataProvider data={data}>
      <WorkDetails />
    </DataProvider>
  );
}