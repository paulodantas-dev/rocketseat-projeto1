import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { sendResponse } from '@/utils/send-response'

export class ListLinkController {
  static async linkList(_: FastifyRequest, reply: FastifyReply) {
    try {
      const linkRepository = new LinkRepositoryDatabase()

      const links = await linkRepository.getAllShortenedLinks()

      if (!links || links.length === 0) {
        return sendResponse({
          reply,
          message: ['No shortened links found'],
          status: 200,
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
