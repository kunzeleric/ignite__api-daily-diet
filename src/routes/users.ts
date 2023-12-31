import bcrypt from 'bcrypt'
import { FastifyInstance } from 'fastify'
import { randomUUID } from 'node:crypto'
import { z } from 'zod'
import { Models } from '../@types'
import { knex } from '../database'
import {
  createUser,
  deleteUser,
  loginUser,
  retrieveUsers,
  updateUser,
} from '../lib/swagger-schemas/user'

export const usersRoutes = async (app: FastifyInstance) => {
  // retorna todos usuários
  app.get('/', retrieveUsers, async (request, reply) => {
    try {
      const users = await knex('users').select('*')

      return { users }
    } catch (error) {
      console.error('Failed retrieving users, try again later.')
      return reply
        .status(500)
        .send({ error: 'Something went wrong, please try again later.' })
    }
  })

  // cria usuário
  app.post('/', createUser, async (request, reply) => {
    try {
      const createUserBodySchema = z.object({
        name: z.string(),
        email: z.string(),
        password: z.string(),
      })

      const { name, email, password } = createUserBodySchema.parse(request.body)

      const userExists = await knex('users').where({ email }).first()

      if (userExists) {
        return reply
          .status(400)
          .send({ error: 'User already exists in database.' })
      } else {
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await knex('users').insert(
          {
            id: randomUUID(),
            name,
            email,
            password: hashPassword,
          },
          ['id', 'name', 'email'],
        )
        return reply.status(201).send({ user: user[0] })
      }
    } catch (error) {
      console.error('Failed to create user, try again later: ', error)
      return reply
        .status(500)
        .send({ error: 'Failed to create user, try again later.' })
    }
  })

  // atualização de dados do usuário com id informado
  app.put('/:id', updateUser, async (request, reply) => {
    try {
      const editUserParamsSchema = z.object({
        id: z.string(),
      })

      const editUserBodySchema = z.object({
        name: z.string().optional(),
        email: z.string().optional(),
      })

      const { id } = editUserParamsSchema.parse(request.params)
      const { name, email } = editUserBodySchema.parse(request.body)

      const users = await knex('users').select()

      const userExists = users.find((user) => user.id === id)

      if (userExists) {
        await knex('users').update({ name, email }).where('id', id)

        return reply.status(204).send({ msg: 'User updated successfully!' })
      } else {
        return reply.status(400).send({ error: 'User not found.' })
      }
    } catch (error) {
      console.error('Failed to update user, try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Failed to update user, try again later.' })
    }
  })

  // deleta usuário com id informado
  app.delete('/:id', deleteUser, async (request, reply) => {
    try {
      const deleteUserParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteUserParamsSchema.parse(request.params)

      const users = await knex('users').select('*')

      const userExists = users.find((user) => user.id === id)

      if (userExists) {
        await knex('users').where('id', id).delete()

        return reply.status(204).send({ msg: 'User successfully deleted.' })
      } else {
        return reply.status(400).send({ error: 'User not found.' })
      }
    } catch (error) {
      console.error('Failed to delete user, try again later.', error)
      return reply
        .status(500)
        .send({ error: 'Failed to delete user, try again later.' })
    }
  })

  // login de usuário na API
  app.post('/login', loginUser, async (request, reply) => {
    try {
      const loginUserBodyParams = z.object({
        email: z.string(),
        password: z.string(),
      })

      const { email, password } = loginUserBodyParams.parse(request.body)

      const userFound: Array<Models.User | null> = await knex('users')
        .where('email', email)
        .select('*')
      if (userFound[0]) {
        const passwordCheck = await bcrypt.compare(
          password,
          userFound[0].password,
        )
        // se password for correto
        if (passwordCheck) {
          let userId = request.cookies.userId
          if (!userId) {
            userId = userFound[0].id

            reply.cookie('userId', userId, {
              path: '/',
              maxAge: 1000 * 60 * 60 * 24 * 7, // 7 dias
            })
          }
          return reply.status(200).send({ msg: 'User logged in successfully!' })
        } else {
          return reply
            .status(400)
            .send({ error: 'User not found! Please try again.' })
        }
      }
    } catch (error) {
      console.error('Failed to login, please try again later.')
      return reply
        .status(500)
        .send({ error: 'Login failed, please try again later.' })
    }
  })
}
