import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'project',
  title: 'Project',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'pdfDocuments',
      title: 'PDF Documents',
      type: 'array',
      of: [
        {
          type: 'file',
          options: {
            accept: '.pdf'
          }
        }
      ]
    }),
    defineField({
      name: 'video',
      title: 'Video',
      type: 'file',
      options: {
        accept: 'video/mp4'
      }
    }),
    defineField({
      name: 'summary',
      title: 'Summary',
      type: 'text',
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
      name: 'linkToBuild',
      title: 'Link To Build',
      type: 'url',
    }),
    defineField({
      name: 'technologies',
      title: 'Technologies',
      type: 'array',
      of: [{type: 'reference', to: {type: 'skills'}}],
    }),
  ],
})

export interface Project extends SanityBody {
    _type: "project";
    title: string;
    pdfDocuments: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    }[];
    video?: {
        _type: "file";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    summary: string;
    image: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    linkToBuild?: string;
    technologies: Technology[];
}

interface SanityBody {
    _createdAt: string;
    _id: string;
    _rev: string;
    _updatedAt: string;
}

export interface Technology extends SanityBody {
    _type: "skill";
    image: {
        _type: "image";
        asset: {
            _ref: string;
            _type: "reference";
        };
    };
    progress: number;
    title: string;
} 