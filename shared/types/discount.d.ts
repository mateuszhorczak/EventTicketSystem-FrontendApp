declare global {
  export interface NewDiscount {
    name: string
    discount_percentage: number
    code: string
    valid_from: Date
    valid_to: Date
  }
}
