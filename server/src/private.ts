import { FastifyInstance } from 'fastify'
import { clerkClient, clerkPlugin, getAuth } from '@clerk/fastify'

export async function privateRoutes(app: FastifyInstance) {
  app.register(clerkPlugin)

  app.get('/private', async (request, reply) => {
    const { userId } = getAuth(request)

    if (!userId) {
      return reply.status(403).send()
    }

    const user = await clerkClient.users.getUser(userId)

    return user
  })
}
