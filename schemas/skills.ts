import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
    }),
    defineField({
      name: 'clinicalSkills',
      title: 'Clinical Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'generalSkills',
      title: 'General Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
    defineField({
      name: 'technicalSkills',
      title: 'Techinical Skills',
      type: 'array',
      of: [{type: 'string'}],
    }),
  ],
}) 