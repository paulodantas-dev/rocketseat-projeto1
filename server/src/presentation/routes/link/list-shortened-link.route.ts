import { ListLinkController } from '@/presentation/controllers/link/list-shortened-link.controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function listShortenedLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/list-links',
    {
      schema: {
        tags: ['LINK'],
        summary: 'List all shortened links',
        description:
          'Retrieves a list of all shortened links created by the user.',
      },
    },
    ListLinkController.linkList,
  )
}
