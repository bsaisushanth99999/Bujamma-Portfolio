export async function fetcher<Data>(url: string): Promise<Data> {
    const response = await fetch(url);
  
    if (!response.ok) {
      throw new Error(`Error fetching data from ${url}: ${response.statusText}`);
    }
  
    const data = await response.json();
  
    return data;
  }
  