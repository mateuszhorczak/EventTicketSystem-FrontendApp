declare global {
  export interface NewEventType {
    name: string
  }

  export type EventType = NewEventType & { id: number }
  export type EventTypeListResponse = ApiResponse<EventType[]>
  export type EventTypeResponse = ApiResponse<EventType>
}
