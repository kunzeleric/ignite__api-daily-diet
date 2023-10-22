import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import bcrypt from 'bcrypt'

export const usersRoutes = async (app: FastifyInstance) => {
  // retorna todos usuários
  app.get('/', { schema: { tags: ['User'] } }, async (request, reply) => {
    // #swagger.tags = ['User'] => separates all CRUD operations of User Schema
    try {
      const users = await knex('users').select('*')

      return { users }
    } catch (error) {
      console.error('Failed retrieving users, try again later.')
      return reply
        .status(500)
        .send('Something went wrong, please try again later.')
    }
  })

  // cria usuário
  app.post('/', { schema: { tags: ['User'] } }, async (request, reply) => {
    // #swagger.tags = ['User'] => separates all CRUD operations of User Schema
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })

      const { name, email, password } = createUserBodySchema.parse(request.body)

      const users = await knex('users').select('*')

      const userExists = users.find((user) => user.email === email)

      if (userExists) {
        return reply.status(400).send('User already exists in database.')
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
        await knex('users').insert({
          id: randomUUID(),
          name,
          email,
          password: hashPassword,
        })
      }
    } catch (error) {
      console.error('Failed to create user, try again later: ', error)
      return reply.status(500).send('Failed to create user, try again later.')
    }
  })

  // atualização de dados do usuário
  app.put('/:id', { schema: { tags: ['User'] } }, async (request, reply) => {
    // #swagger.tags = ['User'] => separates all CRUD operations of User Schema
    try {
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
    } catch (error) {
      console.error('Failed to update user, try again later.')
      return reply.status(500).send('Failed to update user, try again later.')
    }
  })

  // login de usuário na API
  app.post('/login', { schema: { tags: ['User'] } }, async (request, reply) => {
    // #swagger.tags = ['User'] => separates all CRUD operations of User Schema
    try {
      const loginUserBodyParams = z.object({
        email: z.string(),
        password: z.string(),
      })

      const { email, password } = loginUserBodyParams.parse(request.body)

      const userFound = await knex('users').where('email', email).select('*')

      if (userFound[0]) {
        const passwordCheck = await bcrypt.compare(
          password,
          userFound[0].password,
        )
        if (passwordCheck) {
          return reply.status(200).send('User logged in successfully!')
        } else {
          return reply.status(400).send('User not found! Please try again.')
        }
      }
    } catch (error) {
      console.error('Failed to login, please try again later.')
      return reply.status(500).send('Login failed, please try again later.')
    }
  })
}
