declare global {
  export interface NewTicket {
    event: number
    ticket_type: number
    quantity: number
  }

  export type Ticket = NewTicket & { id: number }
  export type TicketListResponse = ApiResponse<Ticket[]>
  export type TicketResponse = ApiResponse<Ticket>
}
