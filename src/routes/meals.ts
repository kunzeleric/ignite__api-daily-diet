import { randomUUID } from 'crypto'
import { FastifyInstance } from 'fastify'
import { z } from 'zod'
import { knex } from '../database'
import {
  createMeal,
  deleteMeal,
  retrieveMealById,
  retrieveMealMetrics,
  retrieveMeals,
  updateMeal,
} from '../lib/swagger-schemas/meal'

export const mealsRoutes = async (app: FastifyInstance) => {
  // lista todas refeições do usuário
  app.get('/', retrieveMeals, async (request, reply) => {
    try {
      const meals = await knex('diet').select('*')
      return { meals }
    } catch (error) {
      console.error('Error listing meals, please try again later.', error)
      return reply
        .status(500)
        .send({ error: 'Error listing meals, please try again later.' })
    }
  })

  // buscar uma refeição específica
  app.get('/:id', retrieveMealById, async (request, reply) => {
    try {
      const getMealParamsSchema = z.object({
        id: z.string().uuid(),
      })

      const { id } = getMealParamsSchema.parse(request.params)

      const meals = await knex('diet').select()
      const mealExists = meals.find((meal) => meal.id === id)
      if (mealExists) {
        const { userId } = request.cookies
        const meal = await knex('diet').where({ id, user_id: userId }).first()

        return reply.status(200).send({ meal })
      } else {
        return reply.status(400).send({
          error: "Meal doesn't exist in database. Try checking the ID",
        })
      }
    } catch (error) {
      console.error('Error listing meal, please try again later.', error)
      return reply
        .status(500)
        .send({ msg: 'Error listing meal, please try again later.' })
    }
  })

  // criar uma refeição
  app.post('/', createMeal, async (request, reply) => {
    try {
      const createMealParamsSchema = z.object({
        name: z.string(),
        details: z.string(),
        is_diet: z.boolean(),
        calories: z.number(),
        meal_type: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack']),
      })

      const { name, details, is_diet, calories, meal_type } =
        createMealParamsSchema.parse(request.body)

      const { userId } = request.cookies

      const meal = await knex('diet').insert(
        {
          id: randomUUID(),
          name,
          details,
          is_diet,
          calories,
          meal_type,
          user_id: userId,
        },
        [
          'id',
          'name',
          'details',
          'is_diet',
          'calories',
          'meal_type',
          'user_id',
        ],
      )

      return reply.status(201).send({ meal: meal[0] })
    } catch (error) {
      console.error('Error creating meal, please try again later.', error)
      return reply
        .status(500)
        .send({ error: 'Error creating meal, please try again later.' })
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
        details: z.string().optional(),
        is_diet: z.boolean().optional(),
        calories: z.number().optional(),
        meal_type: z.enum(['Breakfast', 'Lunch', 'Dinner', 'Snack']).optional(),
      })

      const { id } = editMealParamsSchema.parse(request.params)
      const { name, details, is_diet, calories, meal_type } =
        editMealBodySchema.parse(request.body)

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
          details,
          is_diet,
          calories,
          meal_type,
          updatedAt: formattedUpdatedAt,
        })

        return reply.status(204).send()
      } else {
        return reply
          .status(400)
          .send({ error: "Meal doesn't exist, please validate ID." })
      }
    } catch (error) {
      console.error('Error editing meal, please try again later.', error)
      return reply
        .status(500)
        .send({ error: 'Error editing meal, please try again later.' })
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
          .send({ error: "Meal doesn't exist, please validate ID." })
      }
    } catch (error) {
      console.error('Error deleting meal, please try again later.', error)
      return reply
        .status(500)
        .send({ error: 'Error deleting meal, please try again later.' })
    }
  })

  // métricas de refeições
  app.get('/metrics', retrieveMealMetrics, async (request, reply) => {
    try {
      const { userId } = request.cookies
      const meals = await knex('diet').select().where('user_id', userId)
      let metrics = {
        quantity: 0,
        meals_on_diet: 0,
        meals_not_on_diet: 0,
        best_sequence: 0,
        total_calories: 0,
        calories_on_diet: 0,
        calories_off_diet: 0,
      }

      if (!meals) {
        return reply.status(400).send({ error: 'No meals registered yet.' })
      }

      const mealsOnDiet = meals.reduce((acc, currentMeal) => {
        if (currentMeal.is_diet === 1) {
          acc += 1
        }

        return acc
      }, 0)

      let currentSequence = 0
      let bestSequence = 0

      const bestDietSequence = meals.reduce((acc, currentMeal) => {
        if (currentMeal.is_diet === 1) {
          currentSequence += 1
        } else {
          bestSequence = Math.max(bestSequence, currentSequence)
          currentSequence = 0
        }
        return bestSequence
      }, 0)

      const calories = meals.reduce((acc, currentMeal) => {
        return acc + currentMeal.calories
      })

      const caloriesOnDiet = meals.reduce((acc, currentMeal) => {
        if (currentMeal.is_diet === 1) {
          acc += currentMeal.calories
        }

        return acc
      }, 0)

      metrics = {
        quantity: meals.length,
        meals_on_diet: mealsOnDiet,
        meals_not_on_diet: meals.length - mealsOnDiet,
        best_sequence: bestDietSequence,
        total_calories: calories,
        calories_on_diet: caloriesOnDiet,
        calories_off_diet: calories - caloriesOnDiet,
      }

      reply.status(200).send({ metrics })
    } catch (error) {
      console.error(
        'Error getting meal details, please try again later.',
        error,
      )
      return reply
        .status(500)
        .send({ msg: 'Error getting meal details, please try again later.' })
    }
  })
}
