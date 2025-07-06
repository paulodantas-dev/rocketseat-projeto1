import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { bodySchema } from '@/presentation/routes/link/update-click-link.route'
import { sendResponse } from '@/utils/send-response'

export class UpdateClickLinkController {
  static async updateClick(request: FastifyRequest, reply: FastifyReply) {
    try {
      const { id } = bodySchema.parse(request.body)

      const linkRepository = new LinkRepositoryDatabase()
      await linkRepository.updateClicks(id)

      return sendResponse({
        reply,
        success: true,
        message: ['Link updated successfully'],
        status: 200,
        data: null,
      })
    } catch (error) {
      return sendResponse({
        reply,
        error,
        message: 'Error updating link clicks',
      })
    }
  }
}
