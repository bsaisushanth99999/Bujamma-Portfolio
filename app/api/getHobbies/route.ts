import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const query = groq`*[_type == "hobbies"]`

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2024-03-21',
})

export async function GET() {
  try {
    const hobbies = await client.fetch(query)
    
    if (hobbies && hobbies.length > 0) {
      return NextResponse.json(hobbies[0])
    }
    
    return NextResponse.json(null)
  } catch (error) {
    console.error("Error fetching hobbies:", error)
    return NextResponse.json({ error: "Failed to fetch hobbies" }, { status: 500 })
  }
} 