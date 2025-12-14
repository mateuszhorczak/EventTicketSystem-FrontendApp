declare global {
  export interface NewMessage {
    text: string
  }

  export type Message = NewMessage & { id: number }
  export type MessageListResponse = ApiResponse<Message[]>
  export type MessageResponse = ApiResponse<Message>
}
