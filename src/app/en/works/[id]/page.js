import WorkDetails from "@/components/WorkDetails/WorkDetails";
import { getFetchData } from "@/lib/helpers/DataFetch";
import { ADD_EN_URL, URL_WORK_DETAILS } from "@/lib/helpers/DataUrls";
import { generatePagesMetadata } from "@/lib/helpers/generatePagesMetadata";
import { DataProvider } from "@/lib/providers/DataProvider/DataProvider";
import { notFound } from "next/navigation";
// Generate metadata using the work-specific URL
export async function generateMetadata({ params }) {
  const { id } = await params;

  const workUrl = `${URL_WORK_DETAILS}${id}${ADD_EN_URL}`;
  return generatePagesMetadata(workUrl);
}

export default async function WorkPage({ params }) {
  // Extract the id parameter from the URL
  const { id } = await params;
  
  // Append the id to the API URL
  const workUrl = `${URL_WORK_DETAILS}${id}${ADD_EN_URL}`;
  const data = await getFetchData(workUrl);

  return (
    <DataProvider data={data}>
      <WorkDetails />
    </DataProvider>
  );
}