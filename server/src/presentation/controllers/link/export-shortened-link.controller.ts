import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { sendResponse } from '@/utils/send-response'
import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'

export class ExportShortenedLinkController {
  static async exportShortenedLink(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    try {
      const exportLink = new LinkRepositoryDatabase()

      const csvStream = await exportLink.exportShortenedLink()

      return sendResponse({
        reply,
        success: true,
        message: ['Link exported successfully'],
        status: 200,
        data: csvStream,
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
