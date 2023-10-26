import { FastifyInstance } from 'fastify'
import { knex } from '../database'
import { randomUUID } from 'crypto'
import { z } from 'zod'
import { checkUserIdExists } from '../middlewares/checkUserIdExists'
import {
  createMeal,
  deleteMeal,
  retrieveMealById,
  retrieveMeals,
  updateMeal,
} from '../lib/swagger-schemas/meal'

export const mealsRoutes = async (app: FastifyInstance) => {
  // lista todas refeições do usuário
  app.get('/', retrieveMeals, async (request, reply) => {
    try {
      const { userId } = request.cookies

      const diets = await knex('diet').where('user_id', userId).select()

      return { diets }
    } catch (error) {
      console.error('Error listing meals, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error listing meals, please try again later.' })
    }
  })

  // buscar uma refeição específica
  app.get('/:id', retrieveMealById, async (request, reply) => {
    try {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      const diet = await knex('diet').where('id', id).first()

      return { diet }
    } catch (error) {
      console.error('Error listing meal, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error listing meal, please try again later.' })
    }
  })

  // criar uma refeição
  app.post('/', createMeal, async (request, reply) => {
    // #swagger.tags = ['Meal'] => separates all CRUD operations of Meal Schema
    try {
      const createMealParamsSchema = z.object({
        name: z.string(),
        description: z.string(),
        is_diet: z.boolean(),
      })

      const { name, description, is_diet } = createMealParamsSchema.parse(
        request.body,
      )

      const { userId } = request.cookies

      await knex('diet').insert({
        id: randomUUID(),
        name,
        description,
        is_diet,
        user_id: userId,
      })
    } catch (error) {
      console.error('Error creating meal, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error creating meal, please try again later.' })
    }
  })

  // editar uma refeição
  app.put('/:id', updateMeal, async (request, reply) => {
    try {
      const editMealParamsSchema = z.object({
        id: z.string(),
      })

      const editMealBodySchema = z.object({
        name: z.string().optional(),
        description: z.string().optional(),
        is_diet: z.boolean().optional(),
      })

      const { id } = editMealParamsSchema.parse(request.params)
      const { name, description, is_diet } = editMealBodySchema.parse(
        request.body,
      )

      const meals = await knex('diet').select()
      const mealExists = meals.find((meal) => meal.id === id)

      if (mealExists) {
        const updatedDate = new Date()

        // Formatando a data no formato 'yyyy-MM-dd HH:mm:ss'
        const formattedUpdatedAt = updatedDate
          .toISOString()
          .slice(0, 19)
          .replace('T', ' ')

        await knex('diet').where('id', id).update({
          name,
          description,
          is_diet,
          updatedAt: formattedUpdatedAt,
        })

        return reply.status(204).send()
      } else {
        return reply
          .status(400)
          .send({ msg: "Meal doesn't exist, please validate ID." })
      }
    } catch (error) {
      console.error('Error editing meal, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error editing meal, please try again later.' })
    }
  })

  // deletar uma refeição
  app.delete('/:id', deleteMeal, async (request, reply) => {
    try {
      const deleteMealParamsSchema = z.object({
        id: z.string(),
      })

      const { id } = deleteMealParamsSchema.parse(request.params)

      const meals = await knex('diet').select()
      const mealExists = meals.find((meal) => meal.id === id)

      if (mealExists) {
        await knex('diet').delete().where('id', id)

        return reply.status(204).send()
      } else {
        return reply
          .status(400)
          .send({ msg: "Meal doesn't exist, please validate ID." })
      }
    } catch (error) {
      console.error('Error deleting meal, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error deleting meal, please try again later.' })
    }
  })
}
