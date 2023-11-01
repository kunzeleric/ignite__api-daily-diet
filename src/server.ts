import { app } from './app'
import { env } from './env'
import cookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fastifySwagger from '@fastify/swagger'
import fastifySwaggerUi from '@fastify/swagger-ui'
import { usersRoutes } from './routes/users'
import { mealsRoutes } from './routes/meals'

app.register(cookie)

app.register(cors, { origin: '*' })

app.register(fastifySwagger, {
  openapi: {
    info: {
      title: 'API Daily Diet',
      description: 'API Documentation for Daily Diet Project',
      version: '1.0.0',
    },
    servers: [
      {
        url: 'http://localhost:8080',
        description: 'The production API server',
      },
    ],
    tags: [
      { name: 'User', description: 'User Routes' },
      { name: 'Meal', description: 'Meal Routes' },
    ],
    components: {
      schemas: {
        User: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'User',
            },
            required: {
              type: 'array',
              example: ['name', 'email', 'password'],
              items: {
                type: 'string',
              },
            },
            properties: {
              type: 'object',
              properties: {
                id: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                name: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                email: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                password: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                session_id: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                createdAt: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                    format: {
                      type: 'string',
                      example: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
        Meal: {
          type: 'object',
          properties: {
            title: {
              type: 'string',
              example: 'Meal',
            },
            required: {
              type: 'array',
              example: [
                'name',
                'descriptions',
                'user_id',
                'calories',
                'meal_type',
              ],
              items: {
                type: 'string',
              },
            },
            properties: {
              type: 'object',
              properties: {
                id: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                name: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                description: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                calories: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'number',
                      example: 1000,
                    },
                  },
                },
                meal_type: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'Breakfast',
                    },
                  },
                },
                user_id: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                  },
                },
                createdAt: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                    format: {
                      type: 'string',
                      example: 'date-time',
                    },
                  },
                },
                updatedAt: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'string',
                    },
                    format: {
                      type: 'string',
                      example: 'date-time',
                    },
                  },
                },
              },
            },
          },
        },
      },
    },
  },
})

app.register(fastifySwaggerUi, {
  routePrefix: '/docs',
  uiConfig: {
    docExpansion: 'list',
    deepLinking: false,
  },
  uiHooks: {
    onRequest: function (_request, _reply, next) {
      next()
    },
    preHandler: function (_request, _reply, next) {
      next()
    },
  },
  staticCSP: true,
  transformStaticCSP: (header) => header,
  transformSpecification: (swaggerObject) => {
    return swaggerObject
  },
  transformSpecificationClone: true,
})

// rotas
app.register(usersRoutes, { prefix: '/users' })
app.register(mealsRoutes, { prefix: '/meals' })

app.get('/', (req, res) => {
  res.redirect(302, '/docs') // Redireciona para a rota '/docs'
})

app.listen(
  {
    port: env.PORT,
  },
  () => {
    console.log('Server running on port 8080')
  },
)
