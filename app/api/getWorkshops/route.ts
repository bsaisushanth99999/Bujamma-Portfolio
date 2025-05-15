import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const query = groq`*[_type == "workshops"] {
  _id,
  _type,
  title,
  image,
  summary,
  pdfDocument
}`

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-03-21',
  token: process.env.SANITY_API_TOKEN,
  perspective: 'published',
  stega: false
})

export async function GET() {
  try {
    const workshops = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    return NextResponse.json(workshops, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Error fetching workshops:", error)
    return NextResponse.json({ error: "Failed to fetch workshops" }, { status: 500 })
  }
} 