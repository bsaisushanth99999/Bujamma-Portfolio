import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const query = groq`*[_type == "resume"][0] {
  _id,
  _type,
  pdfDocument,
  photo,
  summary
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
    const resume = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    
    if (!resume) {
      return NextResponse.json({ error: "No resume data found" }, { status: 404 })
    }

    return NextResponse.json(resume, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Error fetching resume:", error)
    return NextResponse.json({ error: "Failed to fetch resume" }, { status: 500 })
  }
} 