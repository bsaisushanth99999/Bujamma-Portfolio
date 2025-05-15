import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'certifications',
  title: 'Certifications',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'certificationsList',
      title: 'Certifications List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'name',
              type: 'string',
              title: 'Certification Name'
            },
            {
              name: 'pdfImage',
              type: 'image',
              title: 'Certificate Image',
              options: {
                hotspot: true,
              },
            },
            {
              name: 'pdfDocument',
              title: 'Certificate PDF',
              type: 'file',
              options: {
                accept: '.pdf'
              }
            }
          ]
        }
      ],
    }),
  ],
}) 