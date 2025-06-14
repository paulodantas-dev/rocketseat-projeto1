import { CreateShortenedLinkController } from '@/presentation/controllers/link/create-shortened-link.controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const bodySchema = z.object({
  longUrl: z.string().url().describe('The long URL to be shortened'),
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
