import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'languages',
  title: 'Languages Section',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Section Title',
      type: 'string',
      initialValue: 'Languages'
    }),
    defineField({
      name: 'languages',
      title: 'Languages',
      type: 'array',
      of: [{
        type: 'object',
        name: 'language',
        fields: [
          {
            name: 'language',
            title: 'Language Name',
            type: 'string',
          },
          {
            name: 'proficiency',
            title: 'Proficiency',
            type: 'string',
            options: {
              list: [
                {title: 'Native', value: 'native'},
                {title: 'Fluent', value: 'fluent'},
                {title: 'Intermediate', value: 'intermediate'},
                {title: 'Basic', value: 'basic'}
              ]
            }
          },
          {
            name: 'flag',
            title: 'Flag',
            type: 'image',
            options: {
              hotspot: true
            }
          }
        ]
      }]
    })
  ]
}) 