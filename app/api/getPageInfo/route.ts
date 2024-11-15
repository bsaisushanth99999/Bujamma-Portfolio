import { groq } from "next-sanity"
import { createClient } from '@sanity/client'
import { PageInfo } from "@/typings"

const query = groq`*[_type == "pageInfo"][0]{
  _type,
  _createdAt,
  _id,
  _rev,
  _updatedAt,
  address,
  backgroundInformation,
  email,
  role,
  heroImage,
  name,
  phoneNumber,
  profilePic
}`

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  useCdn: true,
  apiVersion: '2024-03-21',
})

export async function GET() {
  const pageInfo: PageInfo = await client.fetch(query)
  return new Response(JSON.stringify(pageInfo))
} 