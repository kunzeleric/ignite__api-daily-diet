import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { Models } from '../src/@types'
import { app } from '../src/app'

describe('Meal routes', () => {
  let userId: number
  let mealCreated: Models.Meal

  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(async () => {
    // Reset the database
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')

    // Create a user
    const userResponse = await request(app.server).post('/users').send({
      name: 'Eric Kunzinho',
      email: 'kunzel.eric2@gmail.com',
      password: '123',
    })

    const { user } = JSON.parse(userResponse.text)
    userId = user.id

    // Create a meal
    const createResponse = await request(app.server)
      .post('/meals')
      .set('Cookie', `userId=${userId}`)
      .send({
        name: 'Refeição 1',
        details: 'Macarrão carbonara com salada',
        is_diet: true,
        calories: 900,
        meal_type: 'Lunch',
        user_id: userId,
      })

    const { meal } = JSON.parse(createResponse.text)
    mealCreated = meal
  })

  test('it should be possible to create a meal', async () => {
    const response = await request(app.server)
      .post('/meals')
      .set('Cookie', `userId=${userId}`)
      .send({
        name: 'Refeição 1',
        details: 'Macarrão carbonara com salada',
        is_diet: true,
        calories: 900,
        meal_type: 'Lunch',
        user_id: userId,
      })

    expect(response.statusCode).toEqual(201)
  })

  test('it should be possible to edit a meal', async () => {
    const editResponse = await request(app.server)
      .put(`/meals/${mealCreated.id}`)
      .set('Cookie', `userId=${userId}`)
      .send({
        name: 'Refeição 2',
        details: 'Macarrão carbonara com calabresa',
        is_diet: false,
        calories: 1800,
        meal_type: 'Lunch',
        user_id: userId,
      })

    expect(editResponse.statusCode).toEqual(204)
  })

  test('it should be possible to search a meal by id', async () => {
    const search = await request(app.server)
      .get(`/meals/${mealCreated.id}`)
      .set('Cookie', `userId=${userId}`)
      .send({
        name: 'Refeição 2',
        details: 'Macarrão carbonara com calabresa',
        is_diet: false,
        calories: 1800,
        meal_type: 'Lunch',
        user_id: userId,
      })

    expect(search.statusCode).toEqual(200)
  })
})
