import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { DeleteShortenedLinkController } from '@/presentation/controllers/link/delete-shortened-link.controller'

export const paramsSchema = z.object({
  id: z.string().describe('The unique identifier for the shortened link'),
})

export async function deleteShortenedLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().delete(
    '/delete-link/:id',
    {
      schema: {
        tags: ['LINK'],
        summary: 'Delete a shortened link',
        description:
          'This endpoint allows you to delete a shortened link by its unique identifier.',
      },
    },
    DeleteShortenedLinkController.deleteShortenedLink,
  )
}
