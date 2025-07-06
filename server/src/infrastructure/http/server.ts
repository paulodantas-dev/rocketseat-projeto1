import { fastifyCors } from '@fastify/cors'
import { fastifySwagger } from '@fastify/swagger'
import { fastifySwaggerUi } from '@fastify/swagger-ui'
import { fastify } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import {
  jsonSchemaTransform,
  serializerCompiler,
  validatorCompiler,
} from 'fastify-type-provider-zod'

import { errorHandler } from '@/error-handler'
import { createShortenedLinkRoute } from '@/presentation/routes/link/create-shortened-link.route'
import { deleteShortenedLinkRoute } from '@/presentation/routes/link/delete-shortened-link.route'
import { exportShortenedLinkRoute } from '@/presentation/routes/link/export-shortened-link.route'
import { getShortenedLinkRoute } from '@/presentation/routes/link/get-shortened-link.route'
import { listShortenedLinkRoute } from '@/presentation/routes/link/list-shortened-link.route'
import { updateClickLinkRoute } from '@/presentation/routes/link/update-click-link.route'

export function buildServer() {
  //start app
  const app = fastify({
    logger: {
      transport: {
        target: 'pino-pretty',
        options: {
          colorize: true,
          messageFormat: '{msg}',
          ignore: 'pid,hostname',
        },
      },
    },
  }).withTypeProvider<ZodTypeProvider>()

  //zod integration compilers
  app.setValidatorCompiler(validatorCompiler)
  app.setSerializerCompiler(serializerCompiler)

  //swagger docs
  app.register(fastifySwagger, {
    openapi: {
      info: {
        title: 'Bitly API',
        description: 'API Documentation for Bitly',
        version: '1.0.0',
      },
    },
    transform: jsonSchemaTransform,
  })
  app.register(fastifySwaggerUi, {
    routePrefix: '/api/docs',
  })

  //pre-handlers
  app.register(fastifyCors, {
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  })

  //error handler
  app.setErrorHandler(errorHandler)

  //link routes
  app.register(listShortenedLinkRoute, { prefix: '/api' })
  app.register(createShortenedLinkRoute, { prefix: '/api' })
  app.register(deleteShortenedLinkRoute, { prefix: '/api' })
  app.register(exportShortenedLinkRoute, { prefix: '/api' })
  app.register(getShortenedLinkRoute, { prefix: '/api' })
  app.register(updateClickLinkRoute, { prefix: '/api' })

  return app
}
