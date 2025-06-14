import { ExportShortenedLinkController } from '@/presentation/controllers/link/export-shortened-link.controller'
import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'

export async function exportShortenedLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().get(
    '/export-link',
    {
      schema: {
        tags: ['LINK'],
        summary: 'Export all shortened link',
        description: 'This endpoint allows you to export all shortened links.',
      },
    },
    ExportShortenedLinkController.exportShortenedLink,
  )
}
