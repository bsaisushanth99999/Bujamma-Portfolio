import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { NextResponse } from 'next/server'

const query = groq`*[_type == "hobbies"]`

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
    const hobbies = await client.fetch(query, {}, {
      cache: 'no-store',
      next: { revalidate: 0 }
    })
    console.log('Fetched hobbies:', hobbies)
    
    if (hobbies && hobbies.length > 0) {
      return NextResponse.json(hobbies[0], {
        headers: {
          'Cache-Control': 'no-store, must-revalidate',
          'Pragma': 'no-cache',
          'Expires': '0'
        }
      })
    }
    
    return NextResponse.json(null, {
      headers: {
        'Cache-Control': 'no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
      }
    })
  } catch (error) {
    console.error("Error fetching hobbies:", error)
    return NextResponse.json({ error: "Failed to fetch hobbies" }, { status: 500 })
  }
} 