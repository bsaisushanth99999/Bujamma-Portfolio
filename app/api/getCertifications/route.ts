import { groq } from "next-sanity";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const query = groq`*[_type == "certifications"] {
  title,
  certificationsList[] {
    name,
    pdfImage
  }
}`;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: "2024-03-21",
});

export async function GET() {
  try {
    const certifications = await client.fetch(query);
    
    const data = Array.isArray(certifications) ? certifications[0] : certifications;
    
    return NextResponse.json(data);
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json({ error: "Failed to fetch certifications" }, { status: 500 });
  }
} 