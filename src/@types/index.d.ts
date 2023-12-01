export namespace Models {
  export interface User {
    id: string
    name: string
    email: string
    password: string
  }

  export interface Meal {
    id: string
    name: string
    details: string
    is_diet: boolean
    calories: number
    meal_type: string
    user_id: string
  }
}
