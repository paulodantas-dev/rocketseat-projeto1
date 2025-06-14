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
    const { longUrl } = bodySchema.parse(request.body)

    try {
      const newLink = new LinkRepositoryDatabase()
      const createShortenedLink = await newLink.createShortenedLink(longUrl)

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
        status: error instanceof Error ? 500 : 400,
        message:
          error instanceof Error ? error.message : 'An unknown error occurred',
      })
    }
  }
}
