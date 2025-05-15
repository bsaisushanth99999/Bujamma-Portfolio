'use client'

/**
 * This configuration is used to for the Sanity Studio that's mounted on the `/app/sanity/[[...tool]]/page.tsx` route
 */

import {defineConfig} from 'sanity'
import {structureTool} from 'sanity/structure'
import {visionTool} from '@sanity/vision'
import pageInfo from './schemas/pageInfo'
import hobbies from './schemas/hobbies'
import certifications from './schemas/certifications'
import languages from './schemas/languages'
import skills from './schemas/skills'
import workshops from './schemas/workshops'
import experience from './schemas/experienceSchema'
import project from './schemas/projectSchema'
import resume from './schemas/resumeSchema'

export default defineConfig({
  name: 'default',
  title: 'bujamma-portfolio',

  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-13',
  useCdn: false,

  basePath: '/studio',

  schema: {
    types: [pageInfo, hobbies, certifications, languages, skills, workshops, experience, project, resume],
  },

  plugins: [
    structureTool(),
    visionTool(),
  ],
})
