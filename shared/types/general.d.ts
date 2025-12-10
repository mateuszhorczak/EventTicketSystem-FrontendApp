declare global {
  export type DatabaseType = 'relational' | 'obj-rel' | 'objective' | 'nosql'

  export interface SuccessResponse {
    success: boolean
  }

  export interface ApiResponse<T> {
    success: boolean
    data: T
  }
}
