import WorkDetails from "@/components/WorkDetails/WorkDetails";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { URL_WORK_DETAILS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";

export async function generateMetadata({ params }) {
  const { id } = await params;

  const workUrl = `${URL_WORK_DETAILS}${id}`;
  return generatePagesMetadata(workUrl);
}

export default async function WorkPage({ params }) {
  const { id } = await params;
  
  const workUrl = `${URL_WORK_DETAILS}${id}`;
  const data = await getFetchData(workUrl);

  return (
    <DataProvider data={data}>
      <WorkDetails />
    </DataProvider>
  );
}