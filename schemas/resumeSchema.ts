export default {
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    {
      name: 'pdfDocument',
      title: 'Resume PDF',
      type: 'file',
      options: {
        accept: '.pdf'
      }
    },
    {
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: {
        hotspot: true,
      }
    },
    {
      name: 'summary',
      title: 'Summary',
      type: 'text',
      description: 'A brief summary of your resume'
    }
  ],
} 