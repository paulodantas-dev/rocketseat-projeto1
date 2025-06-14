import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { sendResponse } from '@/utils/send-response'
import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { paramsSchema } from '@/presentation/routes/link/delete-shortened-link.route'

export class DeleteShortenedLinkController {
  static async deleteShortenedLink(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { id } = paramsSchema.parse(request.params)

    try {
      const deleteLink = new LinkRepositoryDatabase()

      await deleteLink.deleteShortenedLink(id)

      return sendResponse({
        reply,
        success: true,
        message: ['Link deleted successfully'],
        status: 200,
      })
    } catch (error) {
      return sendResponse({
        reply,
        status: error instanceof Error ? 500 : 400,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }
}
