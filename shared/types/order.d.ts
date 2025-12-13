declare global {
  export interface NewOrder {
    tickets: NewTicket[]
    discount: number
  }

  export type Order = NewOrder & {
    id: number
    user: User
    purchase_date: string | Date
    total_price: number
  }
  export type OrderListResponse = ApiResponse<Order[]>
  export type OrderResponse = ApiResponse<Order>
}
