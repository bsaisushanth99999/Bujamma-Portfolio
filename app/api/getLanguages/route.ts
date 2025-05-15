import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

// Simplified query
const query = groq`*[_type == "languages"][0]`

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
    const languages = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    console.log('Fetched languages:', languages)
    return NextResponse.json(languages, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Error fetching languages:", error)
    return NextResponse.json({ error: "Failed to fetch languages" }, { status: 500 })
  }
} 