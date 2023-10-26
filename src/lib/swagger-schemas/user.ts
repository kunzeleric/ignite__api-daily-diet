// GET USERS ROUTE
export const retrieveUsers = {
  schema: {
    description: 'Route to get all users in database.',
    summary: 'Get all users.',
    tags: ['User'],
  },
}

// CREATE USER ROUTE
export const createUser = {
  schema: {
    summary: 'Create user.',
    description:
      'Route to create user, information required in the body are name, e-mail & password. There is a verification for the duplicity of e-mails.',
    tags: ['User'],
    body: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
}

// UPDATE USER ROUTE
export const updateUser = {
  schema: {
    summary: 'Update user.',
    description:
      'Route to update user data, information sent through the body. Name, e-mail & password are possible to update.',
    tags: ['User'],
    body: {
      name: { type: 'string' },
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
}

// DELETE USER ROUTE
export const deleteUser = {
  schema: {
    description:
      'Route to delete user, required to send User ID through params.',
    tags: ['User'],
    summary: 'Delete user.',
  },
}

// LOGIN USER ROUTE
export const loginUser = {
  schema: {
    tags: ['User'],
    summary: 'User login with email & pwd.',
    description:
      'Route to login user with e-mail and password information sent through the body.',
    body: {
      email: { type: 'string' },
      password: { type: 'string' },
    },
  },
}
