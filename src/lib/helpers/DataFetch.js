export async function getFetchData(apiUrl) {
  try {
    const response = await fetch(apiUrl, {
      revalidate: 1000,
    });

    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText} \n ${apiUrl}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    return {};
  }
}
