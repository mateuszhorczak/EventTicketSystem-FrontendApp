declare global {
  export interface User {
    id: number
    name: string
    surname: string
    email: string
    role: string
  }

  export interface NewUser {
    email: string
    password: string
  }
}
