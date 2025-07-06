import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'
import { bodySchema } from '@/presentation/routes/link/create-shortened-link.route'
import { sendResponse } from '@/utils/send-response'

export class CreateShortenedLinkController {
  static async createShortenedLink(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { longUrl, shortenedUrl } = bodySchema.parse(request.body)

    try {
      const newLink = new LinkRepositoryDatabase()
      const existingLink = await newLink.getLinkByShortenedUrl(shortenedUrl)

      if (existingLink) {
        return sendResponse({
          reply,
          status: 409,
          message: ['Shortened URL already exists'],
        })
      }

      const createShortenedLink = await newLink.createShortenedLink({
        longUrl,
        shortenedUrl,
      })

      return sendResponse({
        reply,
        success: true,
        message: ['Link created successfully'],
        status: 201,
        data: createShortenedLink.getProps(),
      })
    } catch (error) {
      return sendResponse({
        reply,
        error,
        message: ['Error creating shortened link'],
      })
    }
  }
}
