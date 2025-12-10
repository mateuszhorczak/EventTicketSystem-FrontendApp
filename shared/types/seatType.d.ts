declare global {
  export interface NewSeatType {
    name: string
  }

  export type SeatType = NewSeatType & { id: number }
  export type SeatTypeListResponse = ApiResponse<SeatType[]>
  export type SeatTypeResponse = ApiResponse<SeatType>
}
