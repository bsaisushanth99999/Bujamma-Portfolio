import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'workshops',
  title: 'Workshops',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
    }),
    defineField({
      name: 'pdfDocument',
      title: 'PDF Document',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    }),
  ],
}) 