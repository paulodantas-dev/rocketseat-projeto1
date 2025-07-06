import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { sendResponse } from '@/utils/send-response'

export class ListLinkController {
  static async linkList(request: FastifyRequest, reply: FastifyReply) {
    try {
      const linkRepository = new LinkRepositoryDatabase()

      const links = await linkRepository.getAllShortenedLinks()

      if (!links) {
        return sendResponse({
          reply,
          success: false,
          message: ['No shortened links found'],
          status: 404,
        })
      }

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
