import type { FastifyInstance } from 'fastify'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { UpdateClickLinkController } from '@/presentation/controllers/link/update-click-link.controller'

export const bodySchema = z.object({
  id: z.string().describe('The unique identifier for the shortened link'),
})

export async function updateClickLinkRoute(app: FastifyInstance) {
  app.withTypeProvider<ZodTypeProvider>().post(
    '/update-click',
    {
      schema: {
        tags: ['LINK'],
        summary: 'Update click count for a shortened link',
        description:
          'Increments the click count for a shortened link by its ID.',
        body: bodySchema,
      },
    },
    UpdateClickLinkController.updateClick,
  )
}
