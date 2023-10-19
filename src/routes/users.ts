import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import crypto from 'node:crypto'

export const usersRoutes = async (app: FastifyInstance) => {
  // retorna todos usuários
  app.get('/', async () => {
    const users = await knex('users').select('*')

    return { users }
  })

  // cria usuário
  app.post('/', async (request, reply) => {
    const createUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { name, email, password } = createUserBodySchema.parse(request.body)

    await knex('users').insert({
      id: crypto.randomUUID(),
      name,
      email,
      password,
    })

    return reply.status(201).send('User created successfully!')
  })

  // atualização de dados do usuário
  app.put('/:id', async (request, reply) => {
    const editUserParamsSchema = z.object({
      id: z.string(),
    })

    const editUserBodySchema = z.object({
      name: z.string(),
      email: z.string(),
      password: z.string(),
    })

    const { id } = editUserParamsSchema.parse(request.params)
    const { name, password, email } = editUserBodySchema.parse(request.body)

    await knex('users').update({ name, password, email }).where('id', id)

    return reply.status(204).send('User updated successfully!')
  })
}
