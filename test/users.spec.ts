import { execSync } from 'node:child_process'
import request from 'supertest'
import { afterAll, beforeAll, beforeEach, describe, expect, test } from 'vitest'
import { app } from '../src/app'

describe('Users routes', () => {
  beforeAll(async () => {
    await app.ready()
  })

  afterAll(async () => {
    await app.close()
  })

  beforeEach(() => {
    execSync('npm run knex migrate:rollback --all')
    execSync('npm run knex migrate:latest')
  })

  test('it should be possible to create a user', async () => {
    const response = await request(app.server).post('/users').send({
      name: 'Eric',
      email: 'kunzel.eric@gmail.com',
      password: 'Ku@151511',
    })

    expect(response.statusCode).toEqual(201)
  })

  test('the user must be able to login', async () => {
    const response = await request(app.server).post('/users/login').send({
      email: 'kunzel.eric@gmail.com',
      password: 'Ku@151511',
    })

    expect(response.statusCode).toEqual(200)
  })

  test('the user should be able to edit his own data', async () => {
    const userCreatedResponse = await request(app.server).post('/users').send({
      name: 'Eric Kunzinho',
      email: 'kunzel.eric2@gmail.com',
      password: '123',
    })

    const { user } = JSON.parse(userCreatedResponse.text)

    const response = await request(app.server).put(`/users/${user.id}`).send({
      name: 'Eric',
      email: 'kunzel.eric23@gmail.com',
    })

    expect(response.statusCode).toEqual(204)
  })

  test('it should not be possible to create a user with duplicate email', async () => {
    await request(app.server).post('/users').send({
      name: 'Eric',
      email: 'kunzel.eric2555@gmail.com',
      password: 'Ku@151511',
    })

    const response = await request(app.server).post('/users').send({
      name: 'Eric',
      email: 'kunzel.eric2555@gmail.com',
      password: 'Ku@151511',
    })

    expect(response.statusCode).toEqual(400)
  })
})
