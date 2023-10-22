import { FastifyInstance } from 'fastify'
import { usersRoutes } from './users'

export const routes = (app: FastifyInstance) => {
  app.register(usersRoutes, {
    prefix: '/users',
  })
}
