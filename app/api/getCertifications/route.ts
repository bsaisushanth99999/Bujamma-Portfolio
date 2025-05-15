import { groq } from "next-sanity";
import { createClient } from "@sanity/client";
import { NextResponse } from "next/server";

const query = groq`*[_type == "certifications"] {
  _id,
  _type,
  title,
  certificationsList[] {
    name,
    pdfImage,
    pdfDocument
  }
}`;

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: "2024-03-21",
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
  stega: false
});

export async function GET() {
  try {
    const certifications = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    });
    console.log('Fetched certifications:', certifications);
    
    if (!certifications || certifications.length === 0) {
      return NextResponse.json({ 
        title: "Certifications",
        certificationsList: []
      }, {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      });
    }
    
    // Return the first certification document if it exists
    const data = Array.isArray(certifications) ? certifications[0] : certifications;
    
    return NextResponse.json(data, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    });
  } catch (error) {
    console.error("Error fetching certifications:", error);
    return NextResponse.json({ 
      error: "Failed to fetch certifications",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
} 