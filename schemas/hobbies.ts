import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'hobbies',
  title: 'Hobbies Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Hobbies / Interests'
    }),
    defineField({
      name: 'hobbiesList',
      title: 'Hobbies List',
      type: 'array',
      of: [{type: 'string'}],
      validation: Rule => Rule.required(),
    }),
  ],
}) 