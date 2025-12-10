declare global {
  export interface NewStatus {
    name: string
  }

  export type Status = NewStatus & { id: number }
  export type StatusListResponse = ApiResponse<TicketType[]>
  export type StatusResponse = ApiResponse<TicketType>
}
