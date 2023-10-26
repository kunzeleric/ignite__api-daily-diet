import { checkUserIdExists } from '../../middlewares/checkUserIdExists'

// GET MEALS ROUTE
export const retrieveMeals = {
  schema: {
    tags: ['Meal'],
    summary: 'Get all meals.',
    description: 'Route to get all meals in database.',
  },
  preHandler: [checkUserIdExists],
}

// GET MEAL BY ID ROUTE
export const retrieveMealById = {
  schema: {
    tags: ['Meal'],
    summary: 'Get meal by id.',
    description: 'Route to get a meal by id, required ID in params.',
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
    body: {
      name: { type: 'string' },
      description: { type: 'string' },
      is_diet: { type: 'boolean' },
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
  },
  preHandler: [checkUserIdExists],
}
