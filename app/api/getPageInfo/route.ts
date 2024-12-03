import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

// Query to fetch all fields from the pageInfo document
const query = groq`*[_type == "pageInfo"][0]`

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: false,
  apiVersion: '2024-03-21',
})

export async function GET() {
  try {
    const pageInfo = await client.fetch(query)
    return NextResponse.json(pageInfo)
  } catch (error) {
    console.error("Error fetching pageInfo:", error)
    return NextResponse.json({ error: "Failed to fetch pageInfo" }, { status: 500 })
  }
} 