import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const base = {
  title: z.string(),
  date: z.coerce.date(),
  tags: z.array(z.string()).default([]),
  description: z.string().optional(),
};

const slides = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/slides' }),
  schema: z.object({
    ...base,
    presenter: z.string(),
    fileUrl: z.string(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    author: z.string(),
    fileUrl: z.string().optional(),
  }),
});

const notebooks = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/notebooks' }),
  schema: z.object({
    ...base,
    githubUrl: z.string().optional(),
    colabUrl: z.string().optional(),
  }),
});

const schedule = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/schedule' }),
  schema: z.object({
    eventName: z.string(),
    date: z.coerce.date().or(z.string()),
    time: z.string(),
    location: z.string(),
    description: z.string().optional(),
    rsvpFormSlug: z.string().optional(),
  }),
});

const forms = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/forms' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    googleFormUrl: z.string(),
  }),
});

const officers = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/officers' }),
  schema: ({ image }) =>
    z.object({
      role: z.enum(['president', 'vp-operations', 'vp-outreach', 'vp-programs']),
      name: z.string(),
      email: z.string(),
      photo: image().optional(),
    }),
});

export const collections = { slides, notes, notebooks, schedule, forms, officers };
