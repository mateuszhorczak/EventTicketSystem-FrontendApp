declare global {
  export interface User {
    id: number
    // name: string
    // surname: string
    email: string
    // phone: string
    // role: {
    //   id: number
    //   label: string
    // }
  }

  export interface NewUser {
    // name: string
    // surname: string
    email: string
    // phone: string
    password: string
  }
}
