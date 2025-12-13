declare global {
  export interface NewEvent {
    name: string
    discount_percentage: number
    code: string
    valid_from: Date
    valid_to: Date
    base_price: number
    quantity: number
  }

  export type StandardEvent = NewEvent & { id: number }
  export type EventListResponse = ApiResponse<StandardEvent[]>
  export type EventResponse = ApiResponse<StandardEvent>
}
