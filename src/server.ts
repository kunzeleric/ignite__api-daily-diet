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
        variables: {
          username: {
            default: 'demo',
            description:
              'this value is assigned by the service provider, in this example `gigantic-server.com`',
          },
          port: {
            enum: ['8080', '4000'],
            default: '8080',
          },
          basePath: {
            default: 'v2',
          },
        },
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
                      example: 'Meal 01',
                    },
                  },
                },
                description: {
                  type: 'object',
                  properties: {
                    type: {
                      type: 'string',
                      example: 'A delicious burger with bacon and cheese.',
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
                      example: '2023-10-31 20:33:07',
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
                      example: '2023-11-04 15:30:28',
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
    docExpansion: 'full',
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
