import { env } from './config/env'
import { buildServer } from './infrastructure/http/server'

async function start() {
  const app = buildServer()

  try {
    await app.listen({ port: env.APP_PORT, host: env.APP_HOST })
    app.log.info(
      `Server running at http://${env.APP_HOST}:${env.APP_PORT} API Docs available at http://${env.APP_HOST}:${env.APP_PORT}/docs`,
    )
  } catch (err) {
    app.log.error('Server failed to start:', { err })
    process.exit(1)
  }
}

start()
