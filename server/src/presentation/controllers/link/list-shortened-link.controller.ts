import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { sendResponse } from '@/utils/send-response'
import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'

export class ListLinkController {
  static async linkList(request: FastifyRequest, reply: FastifyReply) {
    try {
      const linkRepository = new LinkRepositoryDatabase()

      const links = await linkRepository.getAllShortenedLinks()

      return sendResponse({
        reply,
        success: true,
        message: ['Links retrieved successfully'],
        status: 200,
        data: links.map((link) => link.getProps()),
      })
    } catch (error) {
      return sendResponse({
        reply,
        error,
        message: 'Error retrieving links',
      })
    }
  }
}
