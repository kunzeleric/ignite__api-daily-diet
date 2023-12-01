// ajuda o knex a identificar quais tabelas e quais campos\tipos de dados
declare module 'knex/types/tables' {
  export interface Tables {
    users: {
      id: string
      name: string
      email: string
      password: string
      session_id?: string
    }

    diet: {
      id: string
      name: string
      details: string
      createdAt: Date
      is_diet: boolean
      user_id: string
      updatedAt: Date
      calories: number
      meal_type: 'Breakfast' | 'Lunch' | 'Dinner' | 'Snack'
    }
  }
}
