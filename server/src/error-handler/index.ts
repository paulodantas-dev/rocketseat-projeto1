import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { sendResponse } from '@/utils/send-response'

import { BaseError } from './types/base-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHandler: FastifyErrorHandler = (error, request, reply) => {
  const logger = request.log

  if ((error as any).validation) {
    logger.error({ error }, 'Fastify validation error')

    return sendResponse({
      reply,
      status: 400,
      message: (error as any).validation
        .map((v: any) => v.message)
        .filter((msg: string | undefined): msg is string => msg !== undefined),
      error,
    })
  }

  if (error instanceof ZodError) {
    logger.error({ error }, 'Zod validation error')

    const zodMessages = Object.values(error.flatten().fieldErrors)
      .flat()
      .filter((msg): msg is string => msg !== undefined)

    return sendResponse({
      reply,
      status: 400,
      message: zodMessages,
      error,
    })
  }

  if (error instanceof BaseError) {
    logger.error({ error }, `${error.statusCode} Error`)

    return sendResponse({
      reply,
      status: error.statusCode,
      message: [error.message],
      error,
      data: null,
    })
  }

  logger.error({ error }, 'Internal server error')

  return sendResponse({
    reply,
    status: 500,
    message: ['Internal server error'],
    error,
  })
}
