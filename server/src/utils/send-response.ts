import type { FastifyReply } from 'fastify'

import { BaseError } from '@/error-handler/types/base-error'

type SendResponseParams<T> = {
  reply: FastifyReply
  status?: number
  success?: boolean
  message: string[] | string
  data?: T | null
  error?: Error | unknown
  logMessage?: string
}

export function sendResponse<T>({
  reply,
  status,
  success,
  message,
  data = null,
  error,
  logMessage,
}: SendResponseParams<T>) {
  if (error) {
    const statusCode =
      error instanceof BaseError ? error.statusCode : status || 500

    const response = {
      success: false,
      message: Array.isArray(message) ? message : [message],
      errorCode: error instanceof BaseError ? error.errorCode : undefined,
      details: error instanceof BaseError ? error.details : undefined,
      data: null,
    }

    reply.log.error(
      { error },
      logMessage ||
        (error instanceof Error ? error.message : 'An error occurred'),
    )
    return reply.code(statusCode).send(response)
  }

  return reply.code(status || 200).send({
    success: success ?? true,
    message: Array.isArray(message) ? message : [message],
    data,
  })
}
