import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { querySchema } from '@/presentation/routes/link/get-shortened-link.route'
import { sendResponse } from '@/utils/send-response'

export class GetLinkController {
  static async getLink(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = querySchema.parse(request.query)

      const linkRepository = new LinkRepositoryDatabase()
      const link = await linkRepository.getShortenedLinkById(id)

      return sendResponse({
        reply,
        success: true,
        message: ['Link retrieved successfully'],
        status: 200,
        data: link ? link.getProps() : null,
      })
    } catch (error) {
      return sendResponse({
        reply,
        error,
        message: 'Error retrieving link',
      })
    }
  }
}
