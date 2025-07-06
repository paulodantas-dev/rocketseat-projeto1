import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { CreateShortenedLinkController } from '@/presentation/controllers/link/create-shortened-link.controller'

export const bodySchema = z.object({
  longUrl: z.string().url().describe('The long URL to be shortened'),
  shortenedUrl: z
    .string()
    .startsWith('brev.ly/')
    .describe('The desired shortened URL'),
})

export async function createShortenedLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/create-link',
    {
      schema: {
        tags: ['LINK'],
        summary: 'Create a new shortened link',
        description:
          'This endpoint allows you to create a new shortened link from a long URL.',
      },
    },
    CreateShortenedLinkController.createShortenedLink,
  )
}
