import type { FastifyReply } from 'fastify/types/reply'
import type { FastifyRequest } from 'fastify/types/request'

import { sendResponse } from '@/utils/send-response'
import { bodySchema } from '@/presentation/routes/link/create-shortened-link.route'
import { LinkRepositoryDatabase } from '@/infrastructure/database/repositories/link-repository.drizzle'

export class CreateShortenedLinkController {
  static async createShortenedLink(
    request: FastifyRequest,
    reply: FastifyReply,
  ) {
    const { longUrl, shortenedUrl } = bodySchema.parse(request.body)

    try {
      const newLink = new LinkRepositoryDatabase()

      if (!shortenedUrl.startsWith('brev.ly/')) {
        return sendResponse({
          reply,
          status: 400,
          message: ['Invalid shortened URL'],
        })
      }

      // Check if the shortened URL already exists
      const existingLink = await newLink.getShortenedLinkById(shortenedUrl)

      console.log('existingLink', existingLink)

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
