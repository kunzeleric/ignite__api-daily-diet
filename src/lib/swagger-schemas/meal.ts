import { checkUserIdExists } from '../../middlewares/checkUserIdExists'

// GET MEALS ROUTE
export const retrieveMeals = {
  schema: {
    tags: ['Meal'],
    summary: 'Get all meals.',
    description: 'Route to get all meals in database.',
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          meals: { type: 'array' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [checkUserIdExists],
}

// GET MEAL BY ID ROUTE
export const retrieveMealById = {
  schema: {
    tags: ['Meal'],
    summary: 'Get meal by id.',
    description: 'Route to get a meal by id, required ID in params.',
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          meal: { type: 'object' },
        },
      },
      400: {
        description: 'Fail response - meal doesnt exist',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [checkUserIdExists],
}

// CREATE A MEAL ROUTE
export const createMeal = {
  schema: {
    tags: ['Meal'],
    summary: 'Create a meal.',
    description:
      'Route to create a meal, required fields in the body such as name, description, is_diet.',
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          meal: {
            id: { type: 'number' },
            name: { type: 'string' },
            is_diet: { type: 'boolean' },
            calories: { type: 'number' },
            meal_type: { type: 'string' },
            user_id: { type: 'number' },
          },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
    body: {
      name: {
        type: 'string',
      },
      description: { type: 'string' },
      is_diet: { type: 'boolean' },
      calories: { type: 'number' },
      meal_type: { type: 'string' },
    },
  },
  preHandler: [checkUserIdExists],
}

// UPDATE MEAL ROUTE
export const updateMeal = {
  schema: {
    tags: ['Meal'],
    summary: 'Update a meal.',
    description:
      'Route to update a meal, information sent through the body. Name, description & is_diet are possible to update.',
    response: {
      201: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          msg: { type: 'string' },
        },
      },
      400: {
        description: 'Fail response - meal doesnt exist',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        500: {
          description: 'Internal error response',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
    body: {
      name: { type: 'string' },
      description: { type: 'string' },
      is_diet: { type: 'boolean' },
      calories: { type: 'number' },
      meal_type: { type: 'string' },
    },
  },
  preHandler: [checkUserIdExists],
}

// UPDATE MEAL ROUTE
export const deleteMeal = {
  schema: {
    tags: ['Meal'],
    summary: 'Update a meal.',
    description: 'Route to delete a meal, required ID in the params.',
    response: {
      204: {
        description: 'Succesful response',
        type: 'object',
      },
      400: {
        description: 'Fail response - meal doesnt exist',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
        500: {
          description: 'Internal error response',
          type: 'object',
          properties: {
            error: { type: 'string' },
          },
        },
      },
    },
  },
  preHandler: [checkUserIdExists],
}

// GET MEALS ROUTE
export const retrieveMealMetrics = {
  schema: {
    tags: ['Meal'],
    summary: 'Get all meal metrics for user.',
    description:
      'Route to get meal metrics. It returns an object with 4 properties, such as Quantity of Meals, Meals on Diet, Meals Not On Diet and the Best Diet Sequence.',
    response: {
      200: {
        description: 'Succesful response',
        type: 'object',
        properties: {
          quantity: { type: 'number' },
          meals_on_diet: { type: 'number' },
          meals_not_on_diet: { type: 'number' },
          best_sequence: { type: 'number' },
          total_calories: { type: 'number' },
          calories_on_diet: { type: 'number' },
          calories_off_diet: { type: 'number' },
        },
      },
      400: {
        description: 'Fail response - no meals registered',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
      500: {
        description: 'Internal error response',
        type: 'object',
        properties: {
          error: { type: 'string' },
        },
      },
    },
  },
  preHandler: [checkUserIdExists],
}
