import { GetLinkController } from '@/presentation/controllers/link/get-shortened-link.controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

export const querySchema = z.object({
  id: z.string().describe('The unique identifier for the shortened link'),
})

export async function getShortenedLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/get-link',
    {
      schema: {
        tags: ['LINK'],
        summary: 'Get a shortened link',
        description: 'Retrieves a shortened link by its ID.',
        querystring: querySchema,
      },
    },
    GetLinkController.getLink,
  )
}
