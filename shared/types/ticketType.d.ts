declare global {
  export interface NewTicketType {
    name: string
    discount: number
  }

  export type TicketType = NewTicketType & { id: number }
  export type TicketTypeListResponse = ApiResponse<TicketType[]>
  export type TicketTypeResponse = ApiResponse<TicketType>
}
