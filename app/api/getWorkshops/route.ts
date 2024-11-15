import { groq } from "next-sanity";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const query = groq`*[_type in ["workshops", "workshopDocument"]] | order(title asc) {
  _id,
  title,
  image,
  summary
}`;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2024-03-21",
});

export async function GET() {
  try {
    const workshops = await client.fetch(query);
    return NextResponse.json(workshops);
  } catch (error) {
    console.error("Error fetching workshops:", error);
    return NextResponse.json({ error: "Failed to fetch workshops" }, { status: 500 });
  }
} 