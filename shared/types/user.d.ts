declare global {
  export interface User {
    id: number
    name: string
    surname: string
    email: string
    role: string
    is_staff: boolean
  }

  export interface NewUser {
    email: string
    password: string
  }
}
