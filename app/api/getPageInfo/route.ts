import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'
import type { PageInfo } from "@/typings"

// Query to fetch all fields from the pageInfo document
const query = groq`*[_type == "pageInfo"][0]`

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
    const pageInfo = await client.fetch<PageInfo>(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    
    if (!pageInfo) {
      return NextResponse.json({ error: "No pageInfo data found" }, { status: 404 })
    }

    return NextResponse.json(pageInfo, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Error fetching pageInfo:", error)
    return NextResponse.json({ error: "Failed to fetch pageInfo" }, { status: 500 })
  }
} 