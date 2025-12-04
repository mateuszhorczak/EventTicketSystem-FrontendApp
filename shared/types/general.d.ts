declare global {
  export type DatabaseType = 'relational' | 'obj-rel' | 'objective' | 'nosql'
  export interface SuccessResponse {
    success: boolean
  }
}
